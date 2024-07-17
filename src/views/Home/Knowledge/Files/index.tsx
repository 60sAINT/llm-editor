import React from "react";
import { useRequest } from "@/hooks/useRequest";
import { knowledgeApi } from "../api";
import { useSearchParams } from "react-router-dom";

const Files = () => {
    const [searchParams] = useSearchParams();
    const db_name = searchParams.get("db_name");

    const { data } = useRequest(() => knowledgeApi.getFiles(db_name!), {
        manual: false,
        ready: !!db_name,
    });
    return <>{JSON.stringify(data)}</>;
};

export default Files;
