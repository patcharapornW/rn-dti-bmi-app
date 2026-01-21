import React, { useRef, useState } from 'react';
import {
  Alert,
  Image,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

export default function Bmi() {
  // สร้าง ref สำหรับจัดการ focus ของ input
  const weightRef = useRef<TextInput>(null);
  const heightRef = useRef<TextInput>(null);

  // สร้าง state สำหรับเก็บค่าที่พิมพ์
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');

  // สร้าง state สำหรับเก็บผลลัพธ์ BMI และคำอธิบาย
  const [bmiResult, setBmiResult] = useState('0.00');
  const [bmiDescription, setBmiDescription] = useState('');

  // ฟังก์ชันรีเซ็ตค่า
  const handleReset = () => {
    setWeight('');
    setHeight('');
    setBmiResult('0.00');
    setBmiDescription('');
    weightRef.current?.focus(); // โฟกัสที่ช่องน้ำหนักหลังรีเซ็ต
  };

  const handleCalPress = () => {
    Keyboard.dismiss(); // ปิด soft keyboard

    // Validate
    if (weight.length == 0 || height.length == 0) {
      Alert.alert('คำเตือน', 'กรุณาป้อนน้ำหนักและส่วนสูงให้ครบถ้วน');
      return;
    }
    if (weight == '0' || height == '0') {
      Alert.alert('คำเตือน', 'น้ำหนักและส่วนสูงต้องไม่เป็น 0');
      return;
    }

    // คำนวณ BMI
    let heightM = parseFloat(height) / 100;
    let bmi = parseFloat(weight) / (heightM * heightM);
    
    setBmiResult(bmi.toFixed(2));

    // แปรผลผลลัพธ์ BMI
    if (bmi < 18.5) {
      setBmiDescription('น้ำหนักน้อยเกินไป (ผอมเกินไป)');
    } else if (bmi < 23) {
      setBmiDescription('ปกติ');
    } else if (bmi < 25) {
      setBmiDescription('อ้วนเล็กน้อย');
    } else if (bmi < 30) {
      setBmiDescription('อ้วนระดับที่ 1');
    } else {
      setBmiDescription('อ้วนระดับที่ 2');
    }
  };

  return (
    // TouchableWithoutFeedback ช่วยให้กดที่ว่างแล้วคีย์บอร์ดหุบลง
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>

        {/* 1. ส่วนโลโก้ */}
        <View style={styles.logoContainer}>
          <Image
            source={require('@/assets/images/bmilogo.png')}
            style={styles.imgLogo}
          />
          <Text style={styles.titleText}>BMI Calculator</Text>
        </View>

        {/* 2. ส่วนช่องกรอกข้อมูล */}
        <View style={styles.inputGroup}>
          {/* ช่องน้ำหนัก */}
          <Text style={styles.label}>ป้อนน้ำหนัก (kg)</Text>
          <View style={styles.cardInput}>
            <TextInput
              ref={weightRef}
              value={weight}
              onChangeText={setWeight}
              style={styles.inputText}
              placeholder="ตัวอย่าง 65"
              keyboardType="decimal-pad"
              returnKeyType="next"
              onSubmitEditing={() => heightRef.current?.focus()}
              blurOnSubmit={false}
            />
          </View>

          {/* ช่องส่วนสูง */}
          <Text style={styles.label}>ป้อนส่วนสูง (cm)</Text>
          <View style={styles.cardInput}>
            <TextInput
              ref={heightRef}
              value={height}
              onChangeText={setHeight}
              style={styles.inputText}
              placeholder="ตัวอย่าง 170"
              keyboardType="decimal-pad"
              returnKeyType="done"
            />
          </View>
        </View>

        {/* 3. ปุ่ม Reset และ คำนวณ */}
        <View style={styles.btnGroup}>
          <TouchableOpacity style={styles.btnReset} onPress={handleReset}>
            <Text style={styles.btnTextReset}>รีเซ็ต</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnCalculate} onPress={handleCalPress}>
            <Text style={styles.btnTextCalculate}>คำนวณ</Text>
          </TouchableOpacity>
        </View>

        {/* การแสดงผล */}
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>BMI: {bmiResult}</Text>
          <Text style={styles.resultDescription}>{bmiDescription}</Text>
        </View>

      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start', // จัดเรียงจากด้านบน
    paddingTop: 20, // เว้นระยะจากขอบบน
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 30,
    // marginTop: 20, // ลบอันนี้ออกได้เลย เพราะเราใช้ justifyContent: 'center' แล้ว
  },
  imgLogo: {
    width: 120,
    height: 120,
    marginBottom: 10,
  },
  titleText: {
    fontSize: 24,
    fontFamily: 'Kanit_700Bold',
    color: '#ff8ae2',
  },
  inputGroup: {
    width: '100%',
    paddingHorizontal: 20, // 2. แก้ตรงนี้ (ลดจาก 40 เหลือ 20) เพื่อให้ช่อง Input กว้างเต็มจอมากขึ้น
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    fontFamily: 'Kanit_400Regular',
    color: '#333',
    marginBottom: 8,
    marginTop: 10,
  },
  cardInput: {
    backgroundColor: '#ffffff',
    borderRadius: 15,
    height: 50,
    justifyContent: 'center',
    width: "100%",
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#f0f0f0'
  },
  inputText: {
    fontSize: 18,
    fontFamily: 'Kanit_400Regular',
    color: '#000',
    width: '100%',
    height: '100%',
    paddingHorizontal: 15,
  },
  btnGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
    marginTop: 20,
  },
  btnReset: {
    backgroundColor: '#a1a1a1', // สีแดงสำหรับปุ่มรีเซ็ต
    paddingVertical: 15,
    width: '35%', // เล็กกว่าปุ่มคำนวณ
    alignItems: 'center',
    borderRadius: 30,
    shadowColor: '#929292',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 8,
  },
  btnCalculate: {
    backgroundColor: '#ff8ae2',
    paddingVertical: 15,
    width: '60%', // ใหญ่กว่าปุ่มรีเซ็ต
    alignItems: 'center',
    borderRadius: 30,
    shadowColor: '#ff8ae2',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 8,
  },
  btnTextReset: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Kanit_700Bold',
  },
  btnTextCalculate: {
    color: '#fff',
    fontSize: 20,
    fontFamily: 'Kanit_700Bold',
  },
  resultContainer: {
    marginTop: 30,
    backgroundColor: '#ffffff',
    width: '90%',
    paddingVertical: 20,
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  resultText: {
    fontSize: 28,
    fontFamily: 'Kanit_700Bold',
    color: '#333',
  },
  resultDescription: {
    fontSize: 20,
    fontFamily: 'Kanit_400Regular',
    color: '#666',
    marginTop: 5,
  },
});