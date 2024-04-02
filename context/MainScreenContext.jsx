import { collection, onSnapshot, query, where } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { database } from "../firebase/config";
import { getStoreData } from "../lib/storage";
import { useNavigation } from "@react-navigation/native";
import { route } from "../constants/route";
import { Alert } from "react-native";

const MainScreenContext = createContext();

// select hook
export const useMainScreenStore = () => useContext(MainScreenContext);

export const MainScreenProvider = ({ children }) => {
  const [userData, setUserData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [userAttendance, setUserAttendance] = useState([]);

  const navigation = useNavigation();

  async function getUserAttendance() {
    try {
      const user = await getStoreData("user");
      const collectionRef = collection(database, "attendance");
      const queryRef = query(collectionRef, where("userId", "==", user.userId));
      const unSubscribe = onSnapshot(queryRef, (snapshots) => {
        const data = snapshots.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setUserAttendance(data);
      });

      return unSubscribe;
    } catch (error) {
      Alert.alert("Something went wrong");
    }
  }
  async function getUserData() {
    try {
      setIsLoading(true);
      const user = await getStoreData("user");
      const collectionRef = collection(database, "users");
      const queryRef = query(collectionRef, where("userId", "==", user.userId));
      const unSubscribe = onSnapshot(queryRef, (snapshots) => {
        const data = snapshots.docs.map((docs) => ({
          ...docs.data(),
          id: docs.id,
        }));

        if (data && data.length === 0) {
          setTimeout(() => {
            setIsLoading(false);
            navigation.replace(route.CreateProfile);
          }, 10000);
          return;
        }

        setUserData(data[0]);
        setIsLoading(false);
      });
      return unSubscribe;
    } catch (error) {
      setIsLoading(false);
    }
  }
  useEffect(() => {
    getUserData();
    getUserAttendance();
  }, []);

  return (
    <MainScreenContext.Provider
      value={{ userData, getUserData, isLoading, userAttendance }}
    >
      {children}
    </MainScreenContext.Provider>
  );
};
