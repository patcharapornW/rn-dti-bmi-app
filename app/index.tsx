import { router } from "expo-router";
import React, { useEffect } from "react";
import { ActivityIndicator, Image, StyleSheet, Text, View } from "react-native";
 
export default function Index() {
  // ใช้ useEffect เพื่อหน่วงเวลาหน้าจอ 3 วินาทีแล้วเปลี่ยนหน้า /bmi
  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/bmi");
    }, 3000);
 
    return () => clearTimeout(timer);
  }, []);
 
  return (
    <View style={styles.container}>
      <Image
        source={require("@/assets/images/bmilogo.png")}
        style={styles.imgLogo}
      />
      <Text style={[styles.appName, { fontSize: 40 }]}>BMI Calculator</Text>
      <Text style={[styles.appName, { fontSize: 20 }]}>คำนวณ BMI</Text>
      <ActivityIndicator
        size="large"
        color="#ffffff"
        style={{ marginTop: 70 }}
      />
    </View>
  );
}
 
const styles = StyleSheet.create({
  appName: {
    color: "#ffffff",
    marginTop: 10,
    fontFamily: "Kanit_700Bold",
  },
  imgLogo: { width: 200, height: 200 },
  container: {  
    flex: 1,
    backgroundColor: "#ff8ae2",
    alignItems: "center",
    justifyContent: "center",
  },
});