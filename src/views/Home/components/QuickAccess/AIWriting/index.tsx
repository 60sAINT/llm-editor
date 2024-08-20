import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CloseOutlined } from "@ant-design/icons";
import { OPERATE } from "@/views/Home/model";
import { Academic } from "./Academic";
import { CourseReport } from "./CourseReport";
import { SocialReport } from "./SocialReport";
import { ReadNote } from "./ReadNote";
import { SpeechDraft } from "./SpeechDraft";
import { Comp } from "./Comp";
import { ExperimentReport } from "./ExperimentReport";
import { TeacherTrain } from "./TeacherTrain";
import { TeachPlan } from "./TeachPlan";
import { TeachConclusion } from "./TeachConclusion";
import { LearningAnalyse } from "./LearningAnalyse";

export const AIWriting = () => {
  const [animationClass, setAnimationClass] = useState("");
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const type = params.get("type");
  const navigate = useNavigate();

  useEffect(() => {
    setAnimationClass("animate");
  }, []);

  return (
    <div className="flex justify-center">
      <div className="absolute right-[10%] h-20 flex items-center top-7">
        <CloseOutlined
          onClick={() => navigate("../recent")}
          className="text-zinc-400 text-xl"
        />
      </div>
      <div className={`box ${animationClass}`}>
        <div className="w-[575px] mt-7 mb-7">
          {type === OPERATE.ACADEMIC ? (
            <Academic />
          ) : type === OPERATE.COURSEREPORT ? (
            <CourseReport />
          ) : type === OPERATE.SOCIALREPORT ? (
            <SocialReport />
          ) : type === OPERATE.ReadingNote ? (
            <ReadNote />
          ) : type === OPERATE.SPEECH ? (
            <SpeechDraft />
          ) : type === OPERATE.COMPOSITION ? (
            <Comp />
          ) : type === OPERATE.EXPERIMENT ? (
            <ExperimentReport />
          ) : type === OPERATE.TRAIN ? (
            <TeacherTrain />
          ) : type === OPERATE.TEACHPLAN ? (
            <TeachPlan />
          ) : type === OPERATE.TEACHCONCLUSION ? (
            <TeachConclusion />
          ) : (
            <LearningAnalyse />
          )}
        </div>
      </div>
    </div>
  );
};
