import React, { useEffect, useState, useRef, useCallback } from "react";
import {
  // Button,
  DocumentLoadEvent,
  OpenFile,
  PdfJs,
  Position,
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
import { Button, Radio, RadioChangeEvent, Skeleton } from "antd";
import { Note, PaperInformationType } from "./interface";
import TextArea from "antd/es/input/TextArea";
import { sideMenuApi } from "@/views/NewDoc/api/FormattingToolBar";

const VIEWER_CONTAINER_STYLE =
  "flex-1 [&>div>div>div>div>div:last-child>div:first-child]:hidden [&>div>div>div>div]:flex [&>div>div>div>div>div]:pt-0 [&>div>div>div>div>div:first-child]:w-[29.1%]";

const PdfViewer = () => {
  const { token } = useAuth();
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const pdfId = params.get("pdfId");

  const { data: paperInformation, loading: paperInformationLoading } =
    useRequest(
      async () => {
        const res = (await pdfApi.getPaperById(
          `Bearer ${token}` || "",
          pdfId!
        )) as PaperInformationType;
        return res;
      },
      { manual: false }
    );
  const { runAsync: updateRecords } = useRequest(async () => {
    const res = await pdfApi.updateRecords({
      token: `Bearer ${token}` || "",
      paper_id: paperInformation?.paper_id!,
      newRecords: notes,
    });
    return res;
  });

  const attachmentPluginInstance = attachmentPlugin();
  const toolbarPluginInstance = toolbarPlugin();
  const { Toolbar } = toolbarPluginInstance;
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
  const fullScreenPluginInstance = fullScreenPlugin();
  const getFilePluginInstance = getFilePlugin({
    fileNameGenerator: (file: OpenFile) => {
      const fileName = file.name.substring(file.name.lastIndexOf("/") + 1);
      return `a-copy-of-${fileName}`;
    },
  });

  const [message, setMessage] = useState("");
  const [notes, setNotes] = useState<Note[]>([]);
  useEffect(() => {
    if (paperInformation?.records) {
      setNotes(paperInformation?.records);
    }
  }, [paperInformation?.records]);
  useEffect(() => {
    if (paperInformation?.records !== notes) {
      updateRecords();
    }
  }, [notes]);
  const notesContainerRef = useRef<HTMLDivElement | null>(null);
  const noteId = useRef(notes.length);
  const noteEles: Map<number, HTMLElement> = new Map();
  const [currentDoc, setCurrentDoc] = useState<PdfJs.PdfDocument | null>(null);

  const handleDocumentLoad = useCallback(
    (e: DocumentLoadEvent) => {
      setCurrentDoc(e.doc);
      if (currentDoc && currentDoc !== e.doc) {
        setNotes([]);
      }
      const { activateTab } = defaultLayoutPluginInstance;
      activateTab(3);
    },
    [currentDoc]
  );

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
        content={() => (
          <div
            style={{ width: "100px" }}
            onClick={() => {
              setDisplayTransFrame(false);
            }}
          >
            Add a note
          </div>
        )}
        offset={{ left: 0, top: -8 }}
      />
    </div>
  );

  const [translation, setTranslation] = useState<string | null>(null); // 翻译
  const [targetLang, setTargetLang] = useState<string>("chinese");
  const [displayedText, setDisplayedText] = useState<string>("");
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [selectedText, setSelectedText] = useState<string>("");
  const [displayTransFrame, setDisplayTransFrame] = useState<boolean>(false);
  const targetLangChange = (e: RadioChangeEvent) =>
    setTargetLang(e.target.value);
  const { runAsync: translateText } = useRequest(async (tar_lang, text) => {
    const res = await sideMenuApi.textTranslate(tar_lang, text, token!);
    return res;
  });

  useEffect(() => {
    if (translation) {
      setIsTyping(true); // 开始打字时设置为 true
      let index = 0;
      const interval = setInterval(() => {
        setDisplayedText((prev) => prev + translation[index]);
        index++;
        if (index >= translation.length) {
          clearInterval(interval);
          setIsTyping(false); // 打字结束时设置为 false
        }
      }, 50); // 每50ms显示一个字符
      return () => clearInterval(interval);
    } else {
      return;
    }
  }, [translation]);

  useEffect(() => {
    // 当选择的文字内容改变时，重置翻译的选择语言、隐藏翻译结果框并清空翻译结果框的内容
    setTargetLang("chinese");
    setTranslation(null);
    setDisplayedText("");
  }, [selectedText]);

  const renderHighlightContent = (props: RenderHighlightContentProps) => {
    const addNote = () => {
      if (message !== "") {
        const note: Note = {
          id: ++noteId.current,
          content: message,
          highlightAreas: props.highlightAreas,
          quote: props.selectedText,
        };
        setNotes((prevNotes) => prevNotes.concat([note]));
        props.cancel();
      }
    };

    return (
      <div
        className="w-80 bg-white rounded-sm p-3 absolute z-[9999] shadow-pdfviewer-modal"
        style={{
          left: `${props.selectionRegion.left}%`,
          top: `${props.selectionRegion.top + props.selectionRegion.height}%`,
        }}
      >
        <div className="border-blue-100 border rounded">
          <TextArea
            autoSize={{ minRows: 3, maxRows: 3 }}
            className="py-2 mr-3"
            onChange={(e) => setMessage(e.target.value)}
            autoFocus={true}
            placeholder="请输入摘录内容"
          />
        </div>
        <div className="flex mt-2 items-center">
          <div className="mr-2">
            <Button onClick={addNote} type="primary">
              添加摘录
            </Button>
          </div>
          <Button
            onClick={async () => {
              setDisplayTransFrame(true);
              setSelectedText(props.selectedText);
              const response = await translateText(
                targetLang,
                props.selectedText
              );
              const reader = response!
                .pipeThrough(new TextDecoderStream())
                .getReader();
              let fullText = "";
              while (true) {
                const { done, value } = await reader.read();
                if (value) {
                  fullText += value;
                  setTranslation(fullText);
                }
                if (done) {
                  break;
                }
              }
            }}
          >
            翻译文本
          </Button>
          <Radio.Group
            onChange={targetLangChange}
            value={targetLang}
            className="flex ml-2"
          >
            <Radio
              value="chinese"
              className="[&>span:last-child]:px-0 ms-0 me-0"
            >
              <span className="ml-1 mr-1.5">中文</span>
            </Radio>
            <Radio
              value="english"
              className="[&>span:last-child]:px-0 ms-0 me-0"
            >
              <span className="ml-1">英文</span>
            </Radio>
          </Radio.Group>
        </div>
        {displayTransFrame && (
          <div className="py-2 border-blue-100 border rounded mt-2 px-2.5 text-base">
            <Skeleton
              loading={!displayedText}
              active
              title={false}
              className="p-2"
            >
              {displayedText}
              {isTyping && <span className="blinking-cursor">|</span>}
            </Skeleton>
          </div>
        )}
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

  useEffect(() => {
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
      {notes && notes.length === 0 && (
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

  const defaultchartHighlightPluginInstance = highlightPlugin({
    renderHighlights: renderchartHighlights,
    trigger: Trigger.None,
  });

  const [chartHighlightPluginInstance, setChartHighlightPluginInstance] =
    useState(defaultchartHighlightPluginInstance);

  const getChartHighlightPluginInstance = (
    chartHighlightPluginInstance: React.SetStateAction<HighlightPlugin>
  ) => setChartHighlightPluginInstance(chartHighlightPluginInstance);

  const pageNavigationPluginInstance = pageNavigationPlugin();
  const { jumpToPage } = pageNavigationPluginInstance;

  const customZoomPluginInstance = customZoomPlugin();
  const { zoomTo } = customZoomPluginInstance;
  useEffect(() => {
    zoomTo(1);
  }, [zoomTo]);

  return (
    <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
      <div className="border border-black/30 flex flex-col h-screen">
        <div className="p-2.5 bg-home-border [&>div>div>div>div]:h-8 [&>div>div:first-child>div:last-child>div>div]:h-8 [&>div>div:first-child>div:first-child>div>div>first-child]:h-8 [&>div>div:first-child>div:nth-child(2)>div>div]:h-8 [&>div>div:last-child>div>div>div]:h-8 [&>div>div:last-child>div:last-child>div>div]:h-auto">
          <Toolbar />
        </div>
        <div className="flex h-pdf-viewer">
          <div className="flex-1">
            <div className="flex flex-1 overflow-hidden h-full">
              <div className={VIEWER_CONTAINER_STYLE}>
                <Skeleton
                  active
                  loading={paperInformationLoading}
                  paragraph={{ rows: 13 }}
                  className="p-10"
                >
                  <Viewer
                    fileUrl={paperInformation?.pdf_url!}
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
                </Skeleton>
              </div>
            </div>
          </div>
          <div className="w-[30%] border-l border-slate-300 overflow-auto">
            <Skeleton active loading={paperInformationLoading} className="m-5">
              {paperInformation && (
                <RightToolBar
                  jumpToPage={jumpToPage}
                  setChartHighlightPluginInstance={
                    getChartHighlightPluginInstance
                  }
                  paperInformation={paperInformation}
                />
              )}
            </Skeleton>
          </div>
        </div>
      </div>
    </Worker>
  );
};

export default PdfViewer;
