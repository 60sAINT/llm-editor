import React, { useState } from "react";
import {
  Button,
  DocumentLoadEvent,
  OpenFile,
  PdfJs,
  Position,
  PrimaryButton,
  ScrollMode,
  SpecialZoomLevel,
  Tooltip,
  Worker,
} from "@react-pdf-viewer/core";
import { Viewer } from "@react-pdf-viewer/core";
import { attachmentPlugin } from "@react-pdf-viewer/attachment";
import { toolbarPlugin } from "@react-pdf-viewer/toolbar";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import { fullScreenPlugin } from "@react-pdf-viewer/full-screen";
// Import the styles
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/attachment/lib/styles/index.css";
import "@react-pdf-viewer/bookmark/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import "@react-pdf-viewer/toolbar/lib/styles/index.css";
import "@react-pdf-viewer/full-screen/lib/styles/index.css";
import "@react-pdf-viewer/page-navigation/lib/styles/index.css";
import "./index.css";
import { getFilePlugin } from "@react-pdf-viewer/get-file";
import {
  HighlightArea,
  highlightPlugin,
  MessageIcon,
  RenderHighlightContentProps,
  RenderHighlightTargetProps,
  RenderHighlightsProps,
  Trigger,
  HighlightPlugin,
} from "@react-pdf-viewer/highlight";
import { pageNavigationPlugin } from "@react-pdf-viewer/page-navigation";
import { RightToolBar } from "./RightToolbar";
import customZoomPlugin from "./plugins/customZoomPlugin";
import { renderchartHighlights } from "./plugins/renderchartHighlights";
import { pdfApi } from "./api";
import { useAuth } from "@/provider/authProvider";
import { useLocation } from "react-router-dom";
import { useRequest } from "@/hooks/useRequest";

// 目录
const VIEWER_CONTAINER_STYLE =
  "flex-1 [&>div>div>div>div>div:last-child>div:first-child]:hidden [&>div>div>div>div]:flex [&>div>div>div>div>div]:pt-0 [&>div>div>div>div>div:first-child]:w-[29.1%]";

// 高亮
interface Note {
  id: number;
  content: string;
  highlightAreas: HighlightArea[];
  quote: string;
}

const PdfViewer = () => {
  // 附件
  const attachmentPluginInstance = attachmentPlugin();
  const { Attachments } = attachmentPluginInstance;
  // 顶部工具栏
  const toolbarPluginInstance = toolbarPlugin();
  const { Toolbar } = toolbarPluginInstance;
  // 目录
  const defaultLayoutPluginInstance = defaultLayoutPlugin({
    sidebarTabs: (defaultTabs) =>
      defaultTabs.concat({
        content: sidebarNotes,
        icon: <MessageIcon />,
        title: "Notes",
      }),
    toolbarPlugin: {
      fullScreenPlugin: {
        onEnterFullScreen: (zoom) => {
          zoom(SpecialZoomLevel.PageFit);
          defaultLayoutPluginInstance.toolbarPluginInstance.scrollModePluginInstance.switchScrollMode(
            ScrollMode.Wrapped
          );
        },
        onExitFullScreen: (zoom) => {
          zoom(SpecialZoomLevel.PageWidth);
          defaultLayoutPluginInstance.toolbarPluginInstance.scrollModePluginInstance.switchScrollMode(
            ScrollMode.Vertical
          );
        },
      },
    },
  });
  const bookmarkPluginInstance =
    defaultLayoutPluginInstance.bookmarkPluginInstance;
  // 全屏
  const fullScreenPluginInstance = fullScreenPlugin();
  // 下载
  const getFilePluginInstance = getFilePlugin({
    fileNameGenerator: (file: OpenFile) => {
      // `file.name` is the URL of opened file
      const fileName = file.name.substring(file.name.lastIndexOf("/") + 1);
      return `a-copy-of-${fileName}`;
    },
  });
  // 笔记高亮
  const [message, setMessage] = React.useState("");
  const [notes, setNotes] = React.useState<Note[]>([]);
  const notesContainerRef = React.useRef<HTMLDivElement | null>(null);
  let noteId = notes.length;
  console.log(notes);
  const noteEles: Map<number, HTMLElement> = new Map();
  const [currentDoc, setCurrentDoc] = React.useState<PdfJs.PdfDocument | null>(
    null
  );
  const handleDocumentLoad = (e: DocumentLoadEvent) => {
    setCurrentDoc(e.doc);
    if (currentDoc && currentDoc !== e.doc) {
      // User opens new document
      setNotes([]);
    }
    //
    const { activateTab } = defaultLayoutPluginInstance;
    activateTab(3);
  };
  const renderHighlightTarget = (props: RenderHighlightTargetProps) => (
    <div
      style={{
        background: "#eee",
        display: "flex",
        position: "absolute",
        left: `${props.selectionRegion.left}%`,
        top: `${props.selectionRegion.top + props.selectionRegion.height}%`,
        transform: "translate(0, 8px)",
        zIndex: 1,
      }}
    >
      <Tooltip
        position={Position.TopCenter}
        target={
          <Button onClick={props.toggle}>
            <MessageIcon />
          </Button>
        }
        content={() => <div style={{ width: "100px" }}>Add a note</div>}
        offset={{ left: 0, top: -8 }}
      />
    </div>
  );
  const renderHighlightContent = (props: RenderHighlightContentProps) => {
    const addNote = () => {
      if (message !== "") {
        const note: Note = {
          id: ++noteId,
          content: message,
          highlightAreas: props.highlightAreas,
          quote: props.selectedText,
        };
        setNotes(notes.concat([note]));
        props.cancel();
      }
    };

    return (
      <div
        style={{
          background: "#fff",
          border: "1px solid rgba(0, 0, 0, .3)",
          borderRadius: "2px",
          padding: "8px",
          position: "absolute",
          left: `${props.selectionRegion.left}%`,
          top: `${props.selectionRegion.top + props.selectionRegion.height}%`,
          zIndex: 1,
        }}
      >
        <div>
          <textarea
            rows={3}
            style={{
              border: "1px solid rgba(0, 0, 0, .3)",
            }}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
        </div>
        <div
          style={{
            display: "flex",
            marginTop: "8px",
          }}
        >
          <div style={{ marginRight: "8px" }}>
            <PrimaryButton onClick={addNote}>Add</PrimaryButton>
          </div>
          <Button onClick={props.cancel}>Cancel</Button>
        </div>
      </div>
    );
  };
  const { activateTab } = defaultLayoutPluginInstance;
  const jumpToNote = (note: Note) => {
    activateTab(3);
    const notesContainer = notesContainerRef.current;
    if (noteEles.has(note.id) && notesContainer) {
      notesContainer.scrollTop = noteEles
        .get(note.id)!
        .getBoundingClientRect().top;
    }
  };
  const renderHighlights = (props: RenderHighlightsProps) => (
    <div>
      {notes.map((note) => (
        <React.Fragment key={note.id}>
          {note.highlightAreas
            .filter((area) => area.pageIndex === props.pageIndex)
            .map((area, idx) => (
              <div
                key={idx}
                style={Object.assign(
                  {},
                  {
                    background: "yellow",
                    opacity: 0.4,
                  },
                  props.getCssProperties(area, props.rotation)
                )}
                onClick={() => jumpToNote(note)}
              />
            ))}
        </React.Fragment>
      ))}
    </div>
  );
  const highlightPluginInstance = highlightPlugin({
    renderHighlightTarget,
    renderHighlightContent,
    renderHighlights,
  });
  const { jumpToHighlightArea } = highlightPluginInstance;
  React.useEffect(() => {
    return () => {
      noteEles.clear();
    };
  }, []);
  const sidebarNotes = (
    <div
      ref={notesContainerRef}
      style={{
        overflow: "auto",
        width: "100%",
      }}
    >
      {notes.length === 0 && (
        <div style={{ textAlign: "center" }}>There is no note</div>
      )}
      {notes.map((note) => {
        return (
          <div
            key={note.id}
            style={{
              borderBottom: "1px solid rgba(0, 0, 0, .3)",
              cursor: "pointer",
              padding: "8px",
            }}
            onClick={() => jumpToHighlightArea(note.highlightAreas[0])}
            ref={(ref): void => {
              noteEles.set(note.id, ref as HTMLElement);
            }}
          >
            <blockquote
              style={{
                borderLeft: "2px solid rgba(0, 0, 0, 0.2)",
                fontSize: ".75rem",
                lineHeight: 1.5,
                margin: "0 0 8px 0",
                paddingLeft: "8px",
                textAlign: "justify",
              }}
            >
              {note.quote}
            </blockquote>
            {note.content}
          </div>
        );
      })}
    </div>
  );

  // 图表提取的高亮
  const defaultchartHighlightPluginInstance = highlightPlugin({
    renderHighlights: renderchartHighlights,
    trigger: Trigger.None,
  });
  const [chartHighlightPluginInstance, setChartHighlightPluginInstance] =
    useState(defaultchartHighlightPluginInstance);
  const getChartHighlightPluginInstance = (
    chartHighlightPluginInstance: React.SetStateAction<HighlightPlugin>
  ) => setChartHighlightPluginInstance(chartHighlightPluginInstance);

  // 页面导航
  const pageNavigationPluginInstance = pageNavigationPlugin();
  const { jumpToPage } = pageNavigationPluginInstance;

  // 缩放
  const customZoomPluginInstance = customZoomPlugin();
  const { zoomTo } = customZoomPluginInstance;
  zoomTo(1);

  // 根据pdfId获取pdf各种信息
  const { token } = useAuth();
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const pdfId = params.get("pdfId");
  const { data: paperInformation, loading: paperInformationLoading } =
    useRequest(
      async () => {
        const res = await pdfApi.getPaperById(`Bearer ${token}` || "", pdfId!);
        return res;
      },
      { manual: false }
    );
  console.log(paperInformation);

  return (
    <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
      <div className="border border-black/30 flex flex-col h-screen">
        <div className="p-2.5 bg-home-border [&>div>div>div>div]:h-8 [&>div>div:first-child>div:last-child>div>div]:h-8 [&>div>div:first-child>div:first-child>div>div>first-child]:h-8 [&>div>div:first-child>div:nth-child(2)>div>div]:h-8 [&>div>div:last-child>div>div>div]:h-8 [&>div>div:last-child>div:last-child>div>div]:h-auto">
          {/* 顶部工具栏 */}
          <Toolbar />
        </div>
        <div className="flex h-pdf-viewer">
          <div className="flex-1">
            <div className="flex flex-1 overflow-hidden h-full">
              <div className={VIEWER_CONTAINER_STYLE}>
                <Viewer
                  fileUrl="http://43.138.11.21:9000/public/MiniCache.pdf"
                  plugins={[
                    attachmentPluginInstance,
                    bookmarkPluginInstance,
                    toolbarPluginInstance,
                    defaultLayoutPluginInstance,
                    fullScreenPluginInstance,
                    getFilePluginInstance,
                    highlightPluginInstance,
                    pageNavigationPluginInstance,
                    chartHighlightPluginInstance,
                    customZoomPluginInstance,
                  ]}
                  onDocumentLoad={handleDocumentLoad}
                />
              </div>
            </div>
          </div>
          {/* 右侧工具栏 */}
          <div className="w-[30%] border-l border-slate-300 overflow-auto">
            {/* <Attachments /> */}
            {/* todo: 点击按钮添加附件 */}
            {/* <Button onClick={() => jumpToPage(5)}>jumpToPage5</Button> */}
            <RightToolBar
              jumpToPage={jumpToPage}
              setChartHighlightPluginInstance={getChartHighlightPluginInstance}
            />
          </div>
        </div>
      </div>
    </Worker>
  );
};

export default PdfViewer;
