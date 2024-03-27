import { useState, useEffect } from "react";
import { getAsyncData } from "./asyncStorageUtils";
import { useListarElementos } from "./CRUDHook";
import { infoURL } from "../api/apiurl";


export const useUserInfo = () => {
  const [info, setInfo] = useState(null);
  const [user, setUser] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const usuariov = await getAsyncData("username");
      setUser(usuariov);
    };

    fetchData();
  }, []);

  const ListarInfo = useListarElementos(`${infoURL}/${user}`, setInfo);
  useEffect(() => {
    if (user) {
      ListarInfo();
    }
  }, [user, ListarInfo]);

  return info;
};
