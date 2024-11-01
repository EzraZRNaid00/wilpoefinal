import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ImageBackground, View, Text, Button, Image, StyleSheet, TouchableOpacity, TextInput, Alert, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Formik } from 'formik';
import * as Yup from 'yup';
import * as ImagePicker from 'expo-image-picker';

const Stack = createStackNavigator();

const coursePrices: Record<string, number> = {
  "First Aid": 1500,
  "Sewing": 1500,
  "Life Skills": 1500,
  "Landscaping": 1500,
  "Child Minding": 750,
  "Cooking": 750,
  "Garden Maintaining": 750,
};

const courseImages: Record<string, any> = {
  "First Aid": require('./assets/firstaid.png'),
  "Sewing": require('./assets/sewing.png'),
  "Life Skills": require('./assets/lifeskills.png'),
  "Landscaping": require('./assets/landscaping.png'),
  "Child Minding": require('./assets/childminding.png'),
  "Cooking": require('./assets/cooking.png'),
  "Garden Maintaining": require('./assets/gardening.png'),
};

// Splash Screen
const SplashScreen = ({ navigation }: { navigation: any }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('Home'); // Directly navigate to Home screen
    }, 2000);
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={{ flex: 1, backgroundColor: '#f5f5f5', justifyContent: 'center', alignItems: 'center' }}>
      <ImageBackground
        source={require('./assets/splashscreen.png')}
        style={{
          width: '100%', 
          height: '100%', 
          justifyContent: 'center', 
          alignItems: 'center',
        }}
      >
        <Image
          source={require('./assets/logo.png')}
          style={{
            width: 150, 
            height: 150,
            marginBottom: 20,
          }}
        />
        <Text style={{ fontSize: 24, color: '#333', fontWeight: 'bold' }}>Welcome to Empowering the Nation</Text>
      </ImageBackground>
    </View>
  );
};


//loginscreen
const LoginScreen = ({ navigation }: { navigation: any }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (values: { username: string; password: string }) => {
    setIsLoading(true);
    try {
      const storedUser = await AsyncStorage.getItem('user');
      const user = storedUser ? JSON.parse(storedUser) : null;

      if (user && user.username === values.username && user.password === values.password) {
        Alert.alert("Success", "Logged in successfully!");
        navigation.navigate('Home');
      } else {
        Alert.alert("Error", "Invalid username or password.");
      }
    } catch (error) {
      Alert.alert("Error", "An error occurred during login.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Formik
      initialValues={{ username: '', password: '' }}
      onSubmit={handleLogin}
      validationSchema={Yup.object().shape({
        username: Yup.string().required('Please enter your username or email.'),
        password: Yup.string().required('Please enter your password.'),
      })}
    >
      {({ handleChange, handleSubmit, errors, touched }) => (
        <ScrollView contentContainerStyle={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#f2f2f2',
          padding: 20,
        }}>
          {/* Logo at the top */}
          <View style={{
            marginBottom: 50,
            alignItems: 'center',
          }}>
            <Image
              source={require('./assets/logo.png')} // Adjust the path to your logo image
              style={{
                width: 130,
                height: 130,
                borderRadius: 65, // Rounded logo for a sleek look
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 5,
              }}
            />
          </View>

          {/* Fancy Gradient Box for Inputs */}
          <View style={{
            width: '100%',
            marginBottom: 30,
            padding: 20,
            backgroundColor: '#fff',
            borderRadius: 15,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 5 },
            shadowOpacity: 0.1,
            shadowRadius: 10,
            elevation: 4,
          }}>
            {/* Username Input */}
            <TextInput
              placeholder="Username or Email"
              onChangeText={handleChange('username')}
              style={{
                height: 50,
                borderColor: '#ddd',
                borderWidth: 1,
                marginBottom: 12,
                paddingHorizontal: 15,
                borderRadius: 10,
                backgroundColor: '#f9f9f9',
                fontSize: 16,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 3 },
                shadowOpacity: 0.1,
                shadowRadius: 3,
              }}
            />
            {errors.username && touched.username && <Text style={{ color: 'red', marginBottom: 12 }}>{errors.username}</Text>}

            {/* Password Input */}
            <TextInput
              placeholder="Password"
              onChangeText={handleChange('password')}
              secureTextEntry
              style={{
                height: 50,
                borderColor: '#ddd',
                borderWidth: 1,
                marginBottom: 12,
                paddingHorizontal: 15,
                borderRadius: 10,
                backgroundColor: '#f9f9f9',
                fontSize: 16,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 3 },
                shadowOpacity: 0.1,
                shadowRadius: 3,
              }}
            />
            {errors.password && touched.password && <Text style={{ color: 'red', marginBottom: 12 }}>{errors.password}</Text>}
          </View>

          {/* Fancy Gradient Login Button */}
          <TouchableOpacity
            onPress={handleSubmit as any}
            style={{
              width: '100%',
              paddingVertical: 15,
              borderRadius: 50,
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 15,
              backgroundColor: isLoading ? '#a5a5a5' : 'linear-gradient(45deg, #007BFF, #00C6FF)',
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.3,
              shadowRadius: 10,
              elevation: 6,
            }}
            disabled={isLoading}
          >
            <Text style={{
              color: '#fff',
              fontWeight: 'bold',
              fontSize: 18,
              letterSpacing: 1,
            }}>
              {isLoading ? "Logging in..." : "Login"}
            </Text>
          </TouchableOpacity>

          {/* Navigate to Register */}
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={{
              color: '#007BFF', // Blue link for registration
              fontSize: 16,
              textAlign: 'center',
              textDecorationLine: 'underline',
            }}>
              Don't have an account? Register
            </Text>
          </TouchableOpacity>
        </ScrollView>
      )}
    </Formik>
  );
};


const RegisterScreen = ({ navigation }: { navigation: any }) => {
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const handleImagePick = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert("Permission to access camera roll is required!");
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync();
    if (!pickerResult.cancelled) {
      setProfileImage(pickerResult.uri);
    }
  };

  const handleRegister = async (values: { username: string; email: string; password: string }) => {
    await AsyncStorage.setItem('user', JSON.stringify(values));
    Alert.alert("Success", "Account created successfully!");
    navigation.navigate('Login');
  };

  return (
    <Formik
      initialValues={{ username: '', email: '', password: '', confirmPassword: '' }}
      onSubmit={handleRegister}
      validationSchema={Yup.object().shape({
        username: Yup.string().required('Please enter username'),
        email: Yup.string().email('Invalid email').required('Please enter email'),
        password: Yup.string().min(6, 'Password must be at least 6 characters').required('Please enter password'),
        confirmPassword: Yup.string()
          .oneOf([Yup.ref('password'), null], 'Passwords must match')
          .required('Please confirm your password'),
      })}
    >
      {({ handleChange, handleSubmit, errors, touched }) => (
        <View style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          padding: 20,
          backgroundColor: '#f7f7f7',
        }}>
          <Text style={{
            fontSize: 24,
            fontWeight: 'bold',
            marginBottom: 20,
          }}>Create an Account</Text>

          {/* Profile Picture Picker */}
          <TouchableOpacity onPress={handleImagePick}>
            <View style={{
              width: 120,
              height: 120,
              borderRadius: 60,
              borderWidth: 1,
              borderColor: '#ddd',
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 20,
            }}>
              {profileImage ? (
                <Image source={{ uri: profileImage }} style={{
                  width: 120,
                  height: 120,
                  borderRadius: 60,
                }} />
              ) : (
                <Text style={{ color: '#888' }}>Pick Profile Image</Text>
              )}
            </View>
          </TouchableOpacity>

          {/* Username Input */}
          <TextInput
            placeholder="Username"
            onChangeText={handleChange('username')}
            style={{
              height: 50,
              width: '100%',
              borderColor: '#ddd',
              borderWidth: 1,
              paddingHorizontal: 15,
              marginBottom: 10,
              borderRadius: 8,
              backgroundColor: '#fff',
            }}
          />
          {errors.username && touched.username && <Text style={{ color: 'red', marginBottom: 10 }}>{errors.username}</Text>}

          {/* Email Input */}
          <TextInput
            placeholder="Email"
            onChangeText={handleChange('email')}
            keyboardType="email-address"
            style={{
              height: 50,
              width: '100%',
              borderColor: '#ddd',
              borderWidth: 1,
              paddingHorizontal: 15,
              marginBottom: 10,
              borderRadius: 8,
              backgroundColor: '#fff',
            }}
          />
          {errors.email && touched.email && <Text style={{ color: 'red', marginBottom: 10 }}>{errors.email}</Text>}

          {/* Password Input */}
          <TextInput
            placeholder="Password"
            onChangeText={handleChange('password')}
            secureTextEntry
            style={{
              height: 50,
              width: '100%',
              borderColor: '#ddd',
              borderWidth: 1,
              paddingHorizontal: 15,
              marginBottom: 10,
              borderRadius: 8,
              backgroundColor: '#fff',
            }}
          />
          {errors.password && touched.password && <Text style={{ color: 'red', marginBottom: 10 }}>{errors.password}</Text>}

          {/* Confirm Password Input */}
          <TextInput
            placeholder="Confirm Password"
            onChangeText={handleChange('confirmPassword')}
            secureTextEntry
            style={{
              height: 50,
              width: '100%',
              borderColor: '#ddd',
              borderWidth: 1,
              paddingHorizontal: 15,
              marginBottom: 10,
              borderRadius: 8,
              backgroundColor: '#fff',
            }}
          />
          {errors.confirmPassword && touched.confirmPassword && <Text style={{ color: 'red', marginBottom: 10 }}>{errors.confirmPassword}</Text>}

          {/* Register Button */}
          <Button
            onPress={handleSubmit}
            title="Register"
            color="#000"
          />

          {/* Navigate to Login */}
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={{ marginTop: 10, color: '#007BFF', textAlign: 'center' }}>
              Already have an account? Log in
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </Formik>
  );
};


// Home Screen
const HomeScreen = ({ navigation }: { navigation: any }) => (
  <ImageBackground 
    source={require('./assets/background.png')} 
    style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}
  >
    {/* Profile Button at the top left */}
    <TouchableOpacity 
      style={{
        position: 'absolute',
        top: 50,
        left: 20,
      }}
      onPress={() => navigation.navigate('Login')} // Navigate to Login/Register on profile button click
    >
      <Image 
        source={require('./assets/profile.png')} 
        style={{
          width: 40,
          height: 40,
          borderRadius: 20,
        }} 
      />
    </TouchableOpacity>

    <Text style={{ 
      fontSize: 34, 
      fontWeight: 'bold', 
      color: '#343a40', 
      marginBottom: 40,
      textAlign: 'center',
      textShadowColor: '#888',
      textShadowOffset: { width: 2, height: 2 },
      textShadowRadius: 3
    }}>
      Explore Our Courses
    </Text>

    {/* Custom Course Cards */}
    <TouchableOpacity 
      style={{
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 16,
        marginBottom: 20,
        padding: 15,
        width: '100%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 6,
        alignItems: 'center',
        borderWidth: 0.5,
        borderColor: '#ddd',
      }} 
      onPress={() => navigation.navigate('SixMonthCourses')}
    >
      <Image 
        source={require('./assets/sixMonthCourses.jpg')} 
        style={{
          width: 70,
          height: 70,
          borderRadius: 35,
          marginRight: 20,
        }} 
      />
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#333' }}>
          Six-Month Courses
        </Text>
        <Text style={{ fontSize: 14, color: '#777' }}>
          Advanced, In-depth Learning
        </Text>
      </View>
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 24, color: '#007BFF' }}>→</Text>
      </View>
    </TouchableOpacity>

    <TouchableOpacity 
      style={{
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 16,
        marginBottom: 20,
        padding: 15,
        width: '100%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 6,
        alignItems: 'center',
        borderWidth: 0.5,
        borderColor: '#ddd',
      }} 
      onPress={() => navigation.navigate('SixWeekCourses')}
    >
      <Image 
        source={require('./assets/sixWeekCourses.jpg')} 
        style={{
          width: 70,
          height: 70,
          borderRadius: 35,
          marginRight: 20,
        }} 
      />
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#333' }}>
          Six-Week Courses
        </Text>
        <Text style={{ fontSize: 14, color: '#777' }}>
          Focused, Fast-Track Learning
        </Text>
      </View>
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 24, color: '#007BFF' }}>→</Text>
      </View>
    </TouchableOpacity>

    {/* Other Buttons */}
    <TouchableOpacity 
      onPress={() => navigation.navigate('AboutUs')}
      style={{
        backgroundColor: '#007BFF',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 30,
        width: '100%',
        alignItems: 'center',
        marginTop: 20,
        shadowColor: '#007BFF',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 6,
      }}
    >
      <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>About Us</Text>
    </TouchableOpacity>

    <TouchableOpacity 
      onPress={() => navigation.navigate('ContactUs')}
      style={{
        backgroundColor: '#007BFF',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 30,
        width: '100%',
        alignItems: 'center',
        marginTop: 20,
        shadowColor: '#007BFF',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 6,
      }}
    >
      <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>Contact Us</Text>
    </TouchableOpacity>

    <TouchableOpacity 
      onPress={() => navigation.navigate('CalculateFees')}
      style={{
        backgroundColor: '#007BFF',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 30,
        width: '100%',
        alignItems: 'center',
        marginTop: 20,
        shadowColor: '#007BFF',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 6,
      }}
    >
      <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>Calculate Fees</Text>
    </TouchableOpacity>
  </ImageBackground>
);




// Six-Month Courses Screen
const SixMonthCoursesScreen = ({ navigation }: { navigation: any }) => (
  <View style={{ flex: 1, backgroundColor: '#e6e6e6', padding: 20 }}>
    <Text style={{ fontSize: 28, fontWeight: 'bold', color: '#444', textAlign: 'center', marginBottom: 30 }}>
      Explore Our Six-Month Courses
    </Text>

    <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
      {["First Aid", "Sewing", "Life Skills", "Landscaping"].map((course) => (
        <TouchableOpacity
          key={course}
          onPress={() => navigation.navigate('CourseDetails', { course })}
          activeOpacity={0.85}
          style={{
            width: '48%',
            backgroundColor: '#fff',
            marginBottom: 20,
            borderRadius: 15,
            overflow: 'hidden',
            elevation: 5,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.2,
            shadowRadius: 5,
          }}
        >
          <Image
            source={courseImages[course]}
            style={{
              width: '100%',
              height: 150,
              borderTopLeftRadius: 15,
              borderTopRightRadius: 15,
              resizeMode: 'cover',
            }}
          />
          <View style={{ padding: 15 }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#333' }}>{course}</Text>
            <Text style={{ fontSize: 16, color: '#777', marginVertical: 10 }}>
              Price: {coursePrices[course]} Rand
            </Text>
            <TouchableOpacity
              style={{
                backgroundColor: '#0099FF',
                paddingVertical: 10,
                borderRadius: 8,
                alignItems: 'center',
                marginTop: 10,
              }}
              onPress={() => navigation.navigate('CourseDetails', { course })}
            >
              <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold' }}>View Course</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  </View>
);


// Six-Week Courses Screen
const SixWeekCoursesScreen = ({ navigation }: { navigation: any }) => (
  <View style={{ flex: 1, backgroundColor: '#e6e6e6', padding: 20 }}>
    <Text style={{ fontSize: 28, fontWeight: 'bold', color: '#444', textAlign: 'center', marginBottom: 30 }}>
      Explore Our Six-Week Courses
    </Text>
    
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
      {["Child Minding", "Cooking", "Garden Maintaining"].map((course) => (
        <TouchableOpacity
          key={course}
          onPress={() => navigation.navigate('CourseDetails', { course })}
          activeOpacity={0.85}
          style={{
            width: '48%', // Two cards per row
            backgroundColor: '#fff',
            marginBottom: 20,
            borderRadius: 15,
            overflow: 'hidden',
            elevation: 5, // Shadow for Android
            shadowColor: '#000', // Shadow for iOS
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.2,
            shadowRadius: 5,
          }}
        >
          <Image
            source={courseImages[course]}
            style={{
              width: '100%',
              height: 150,
              borderTopLeftRadius: 15,
              borderTopRightRadius: 15,
              resizeMode: 'cover',
            }}
          />
          <View style={{ padding: 15 }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#333' }}>{course}</Text>
            <Text style={{ fontSize: 16, color: '#777', marginVertical: 10 }}>
              Price: {coursePrices[course]} Rand
            </Text>
            <TouchableOpacity
              style={{
                backgroundColor: '#0099FF',
                paddingVertical: 10,
                borderRadius: 8,
                alignItems: 'center',
                marginTop: 10,
              }}
              onPress={() => navigation.navigate('CourseDetails', { course })}
            >
              <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold' }}>View Course</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  </View>
);


// Course Card Component
const CourseDetailsScreen = ({ route, navigation }: { route: any, navigation: any }) => {
  const { course } = route.params;
  const [isEnrolled, setIsEnrolled] = useState(false);

  useEffect(() => {
    const checkEnrollment = async () => {
      const storedCourses = await AsyncStorage.getItem('selectedCourses');
      const enrolledCourses = storedCourses ? JSON.parse(storedCourses) : [];
      setIsEnrolled(enrolledCourses.includes(course));
    };
    checkEnrollment();
  }, [course]);

  const handleEnroll = async () => {
    const storedCourses = await AsyncStorage.getItem('selectedCourses');
    let enrolledCourses = storedCourses ? JSON.parse(storedCourses) : [];

    if (isEnrolled) {
      enrolledCourses = enrolledCourses.filter((c: string) => c !== course);
    } else {
      enrolledCourses.push(course);
    }

    await AsyncStorage.setItem('selectedCourses', JSON.stringify(enrolledCourses));
    setIsEnrolled(!isEnrolled);
  };

  // Updated course details with new descriptions
  const courseDetails = {
    "First Aid": {
      purpose: "Essential skills for emergency situations.",
      content: [
        "Basic life support techniques",
        "Recognizing and responding to emergencies",
        "Managing wounds and injuries",
        "Understanding CPR and its application"
      ],
    },
    "Sewing": {
      purpose: "Crafting garments with precision and creativity.",
      content: [
        "Mastering different sewing techniques",
        "Creating custom clothing",
        "Repairing and altering garments",
        "Exploring fabric types and uses"
      ],
    },
    "Life Skills": {
      purpose: "Empowering you with practical life management skills.",
      content: [
        "Financial literacy essentials",
        "Navigating workplace rights and responsibilities",
        "Improving reading and writing skills",
        "Developing basic math skills"
      ],
    },
    "Landscaping": {
      purpose: "Transforming outdoor spaces into beautiful landscapes.",
      content: [
        "Understanding plant care and maintenance",
        "Techniques for effective gardening",
        "Design principles for landscapes",
      ],
    },
    "Child Minding": {
      purpose: "Comprehensive child care strategies.",
      content: [
        "Caring for infants and toddlers",
        "Engaging educational activities",
        "Safety and first aid for children",
        "Understanding child development stages"
      ],
    },
    "Cooking": {
      purpose: "Building a foundation in culinary skills.",
      content: [
        "Meal prep and planning basics",
        "Healthy cooking practices",
        "Baking fundamentals",
        "Kitchen safety and hygiene"
      ],
    },
    "Garden Maintaining": {
      purpose: "Sustaining healthy and vibrant gardens.",
      content: [
        "Effective watering and pruning techniques",
        "Understanding plant growth cycles",
        "Maintaining a diverse garden ecosystem"
      ],
    },
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#f0f0f0', padding: 20, alignItems: 'center' }}>
      <Image source={courseImages[course]} style={{ width: '100%', height: 250, borderRadius: 15, marginBottom: 20, resizeMode: 'cover' }} />
      <Text style={{ fontSize: 30, fontWeight: 'bold', color: '#222', marginBottom: 10 }}>{course}</Text>
      <Text style={{ fontSize: 18, color: '#555', textAlign: 'center', marginBottom: 20 }}>
        Objective: {courseDetails[course].purpose}
        {"\n\n"}
        Topics Covered: {courseDetails[course].content.join(', ')}
      </Text>
      <TouchableOpacity 
        onPress={handleEnroll}
        style={{
          backgroundColor: '#007BFF',
          paddingVertical: 15,
          paddingHorizontal: 40,
          borderRadius: 12,
          alignItems: 'center',
        }}
      >
        <Text style={{ color: '#fff', fontSize: 20, fontWeight: 'bold' }}>{isEnrolled ? "Deselect" : "Select"}</Text>
      </TouchableOpacity>
    </View>
  );
};


const CalculateFeesScreen = ({ navigation }: { navigation: any }) => {
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);
  const [totalFees, setTotalFees] = useState(0);
  const [discount, setDiscount] = useState(0); // State for discount

  useEffect(() => {
    const getSelectedCourses = async () => {
      const courses = await AsyncStorage.getItem('selectedCourses');
      const parsedCourses = courses ? JSON.parse(courses) : [];
      setSelectedCourses(parsedCourses);
      calculateTotalFees(parsedCourses);
    };
    getSelectedCourses();
  }, []);

  const calculateTotalFees = (courses: string[]) => {
    const fees = courses.reduce((sum, course) => sum + coursePrices[course], 0);
    setTotalFees(fees);
    calculateDiscount(courses.length, fees); // Calculate discount based on the number of courses
  };

  const calculateDiscount = (courseCount: number, fees: number) => {
    let discountPercentage = 0;

    if (courseCount === 2) {
      discountPercentage = 0.05; // 5% discount for 2 courses
    } else if (courseCount === 3) {
      discountPercentage = 0.10; // 10% discount for 3 courses
    } else if (courseCount > 3) {
      discountPercentage = 0.15; // 15% discount for more than 3 courses
    }

    const discountAmount = fees * discountPercentage;
    setDiscount(discountAmount);
  };

  const removeCourse = async (courseToRemove: string) => {
    const updatedCourses = selectedCourses.filter(course => course !== courseToRemove);
    setSelectedCourses(updatedCourses);
    await AsyncStorage.setItem('selectedCourses', JSON.stringify(updatedCourses));
    calculateTotalFees(updatedCourses); // Recalculate fees after removal
  };

  const handleProceedToCheckout = () => {
    Alert.alert(
      "Success!",
      `Your checkout has been processed for the following courses: ${selectedCourses.join(', ')}.`
    );

    // Optionally clear the selected courses after checkout
    setSelectedCourses([]);
    setTotalFees(0);
    setDiscount(0); // Reset discount
    AsyncStorage.removeItem('selectedCourses'); // Clear courses from AsyncStorage

    // Navigate back to home or reset the flow
    navigation.navigate('Home');
  };

  const finalTotal = totalFees - discount; // Calculate the final total after discount

  return (
    <View style={{ flex: 1, backgroundColor: '#eaeaea', padding: 20 }}>
      {/* Selected Courses */}
      <Text style={{ fontSize: 26, fontWeight: 'bold', color: '#2c3e50', marginBottom: 15 }}>Your Selected Courses:</Text>
      {selectedCourses.map((course) => (
        <View key={course} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12, padding: 10, backgroundColor: '#ffffff', borderRadius: 8, shadowColor: '#000', shadowOpacity: 0.1, shadowOffset: { width: 0, height: 2 }, elevation: 2 }}>
          <Text style={{ fontSize: 18, color: '#34495e' }}>{course} - {coursePrices[course]} Rand</Text>
          <TouchableOpacity 
            style={{ backgroundColor: '#e74c3c', paddingVertical: 6, paddingHorizontal: 12, borderRadius: 5 }}
            onPress={() => removeCourse(course)}
          >
            <Text style={{ color: '#fff', fontSize: 16 }}>Remove</Text>
          </TouchableOpacity>
        </View>
      ))}
      
      {/* Total Fees */}
      <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#2c3e50', marginBottom: 10 }}>Total Fees: {totalFees} Rand</Text>
      {discount > 0 && (
        <Text style={{ fontSize: 18, color: '#27ae60', marginBottom: 10 }}>Discount Applied: {discount} Rand</Text>
      )}
      <Text style={{ fontSize: 22, fontWeight: 'bold', color: '#2c3e50', marginBottom: 25 }}>Final Total: {finalTotal} Rand</Text>

      {/* Checkout Button */}
      <TouchableOpacity 
        style={{
          backgroundColor: '#3498db',
          paddingVertical: 14,
          paddingHorizontal: 35,
          borderRadius: 12,
          alignItems: 'center',
          shadowColor: '#000',
          shadowOpacity: 0.2,
          shadowOffset: { width: 0, height: 2 },
          elevation: 5,
        }}
        onPress={handleProceedToCheckout}
      >
        <Text style={{ color: '#fff', fontSize: 20, fontWeight: 'bold' }}>Checkout</Text>
      </TouchableOpacity>
    </View>
  );
};


const PurchaseScreen = ({ route, navigation }: { route: any, navigation: any }) => {
  const { selectedCourses, totalFees } = route.params; // Destructure courses and fees
  const [paymentMethod, setPaymentMethod] = useState<string>('Card');
  const [cardDetails, setCardDetails] = useState({ cardNumber: '', expiry: '', cvc: '' });

  const handlePayment = () => {
    if (!cardDetails.cardNumber || !cardDetails.expiry || !cardDetails.cvc) {
      Alert.alert('Error', 'Please enter complete card details.');
      return;
    }

    // Simulate a payment process (In real case, integrate a payment gateway)
    Alert.alert('Payment Successful', `You have successfully paid for ${selectedCourses.join(', ')} with ${paymentMethod}. Total: ${totalFees} Rand`);

    // Navigate back to home screen or a success screen after payment
    navigation.navigate('Home');  // Adjust as per your navigation flow
  };

  return (
    <View style={styles.paymentContainer}>
      <Text>Total Fees: {totalFees} Rand</Text> {/* Correctly wrapped in <Text> */}
      <Text>Selected Courses: {selectedCourses.join(', ')}</Text> {/* Correctly wrapped in <Text> */}

      <Text>Select Payment Method:</Text>
      <View style={styles.paymentOptions}>
        <TouchableOpacity onPress={() => setPaymentMethod('Card')}>
          <Text style={styles.paymentText}>Card</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setPaymentMethod('E-Wallet')}>
          <Text style={styles.paymentText}>E-Wallet</Text>
        </TouchableOpacity>
      </View>

      {paymentMethod === 'Card' && (
        <View>
          <TextInput
            placeholder="Card Number"
            keyboardType="numeric"
            onChangeText={(text) => setCardDetails({ ...cardDetails, cardNumber: text })}
            value={cardDetails.cardNumber}
          />
          <TextInput
            placeholder="Expiry (MM/YY)"
            keyboardType="numeric"
            onChangeText={(text) => setCardDetails({ ...cardDetails, expiry: text })}
            value={cardDetails.expiry}
          />
          <TextInput
            placeholder="CVC"
            keyboardType="numeric"
            onChangeText={(text) => setCardDetails({ ...cardDetails, cvc: text })}
            value={cardDetails.cvc}
          />
        </View>
      )}

      <Button title="Pay Now" onPress={handlePayment} />
    </View>
  );
};

// About Us Screen
const AboutUsScreen = () => (
  <View style={{
    flex: 1,
    backgroundColor: '#f7f7f7',
    padding: 20,
    alignItems: 'center',
  }}>
    <Text style={{
      fontSize: 32,
      fontWeight: 'bold',
      color: '#333',
      marginBottom: 20,
    }}>
      About Us
    </Text>
    <Text style={{
      fontSize: 16,
      color: '#666',
      textAlign: 'center',
      marginBottom: 15,
    }}>
      Precious Radebe, a passionate advocate for social empowerment, founded Empowering the Nation in 2018 to uplift domestic workers and gardeners in South Africa.
    </Text>
    <Text style={{
      fontSize: 28,
      fontWeight: 'bold',
      color: '#333',
      marginBottom: 10,
    }}>
      Our Mission
    </Text>
    <Text style={{
      fontSize: 16,
      color: '#666',
      textAlign: 'center',
      marginBottom: 15,
    }}>
      We provide essential skills and knowledge to help improve the lives of domestic workers and gardeners. Our programs focus on practical training, skill-building, and personal growth to create better job opportunities and financial stability.
    </Text>
    <Text style={{
      fontSize: 24,
      fontWeight: 'bold',
      color: '#333',
      marginBottom: 10,
    }}>
      Why We Were Created
    </Text>
    <Text style={{
      fontSize: 16,
      color: '#666',
      textAlign: 'center',
      marginBottom: 15,
    }}>
      Understanding the struggles faced by many in these roles, Precious saw the need for upskilling programs that enhance job performance, foster confidence, and open new career paths.
    </Text>
    <Text style={{
      fontSize: 16,
      color: '#666',
      textAlign: 'center',
      marginTop: 20,
      marginBottom: 20,
    }}>
      Through this initiative, we are dedicated to empowering individuals to reach their full potential. Thank you for learning about our mission.
    </Text>
    <Image
      source={require('./assets/preciousradebe.png')} // Adjust the path to the image
      style={{
        width: 245,
        height: 223,
        borderRadius: 15, // Rounded edges
        resizeMode: 'cover',
      }}
    />
  </View>
);

const ContactUsScreen = () => (
  <View style={{
    flex: 1,
    backgroundColor: '#f7f7f7',
    padding: 20,
    alignItems: 'center',
  }}>
    <Text style={{
      fontSize: 32,
      fontWeight: 'bold',
      color: '#333',
      marginBottom: 20,
    }}>
      Contact Us
    </Text>
    <Text style={{
      fontSize: 16,
      color: '#666',
      textAlign: 'center',
      marginBottom: 10,
    }}>
      Phone Number:
    </Text>
    <Text style={{
      fontSize: 16,
      color: '#333',
      marginBottom: 15,
    }}>
      021 713 4983
    </Text>
    <Text style={{
      fontSize: 16,
      color: '#666',
      textAlign: 'center',
      marginBottom: 10,
    }}>
      Email Address:
    </Text>
    <Text style={{
      fontSize: 16,
      color: '#333',
      marginBottom: 15,
    }}>
      contact@etn.co.za
    </Text>
    <Text style={{
      fontSize: 18,
      fontWeight: 'bold',
      color: '#333',
      marginBottom: 10,
    }}>
      Kensington Office
    </Text>
    <Text style={{
      fontSize: 16,
      color: '#666',
      marginBottom: 15,
    }}>
      63 Roberts Avenue, Kensington, Johannesburg, 2101
    </Text>
    <Text style={{
      fontSize: 18,
      fontWeight: 'bold',
      color: '#333',
      marginBottom: 10,
    }}>
      Parktown Office
    </Text>
    <Text style={{
      fontSize: 16,
      color: '#666',
      marginBottom: 15,
    }}>
      6 Victoria Avenue, Parktown, Johannesburg, 2193
    </Text>
    <Text style={{
      fontSize: 18,
      fontWeight: 'bold',
      color: '#333',
      marginBottom: 10,
    }}>
      Mayfair Office
    </Text>
    <Text style={{
      fontSize: 16,
      color: '#666',
      marginBottom: 15,
    }}>
      102 Central Road, Mayfair, Johannesburg, 2108
    </Text>
    <Image
      source={require('./assets/location.png')}
      style={{
        width: 245,
        height: 223,
        borderRadius: 15,
        resizeMode: 'cover',
        marginTop: 20,
      }}
    />
  </View>
);


const App = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="Splash">
      <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="SixMonthCourses" component={SixMonthCoursesScreen} />
      <Stack.Screen name="SixWeekCourses" component={SixWeekCoursesScreen} />
      <Stack.Screen name="CourseDetails" component={CourseDetailsScreen} />
      <Stack.Screen name="CalculateFees" component={CalculateFeesScreen} />
      <Stack.Screen name="Purchase" component={PurchaseScreen} />
      <Stack.Screen name="AboutUs" component={AboutUsScreen} />
      <Stack.Screen name="ContactUs" component={ContactUsScreen} />
    </Stack.Navigator>
  </NavigationContainer>
);


const styles = StyleSheet.create({
  splashScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f4f8', // Light background color for splash screen
  },
  formContainer: {
    padding: 20,
    justifyContent: 'center',
    flex: 1,
    backgroundColor: '#ffffff', // White background for form
    borderRadius: 10,
    shadowColor: '#000', // Adding shadow for elevation
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  profileImageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  profileImagePlaceholder: {
    backgroundColor: 'lightgrey',
    padding: 10,
    borderRadius: 50,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ccc', // Lighter border color
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    borderRadius: 5, // Rounded corners for inputs
  },
  error: {
    color: 'red',
  },
  loginText: {
    marginTop: 15,
    color: '#007BFF', // Bootstrap primary blue
    textAlign: 'center',
  },
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  courseContainer: {
    padding: 20,
    backgroundColor: '#f9f9f9', // Light grey background for course container
    borderRadius: 10,
  },
  courseTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  card: {
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc', // Light border color for cards
    borderRadius: 5,
    alignItems: 'center',
    backgroundColor: '#fff', // White background for cards
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  courseImage: {
    width: 100,
    height: 100,
    borderRadius: 5, // Rounded corners for course images
  },
  courseDetailContainer: {
    padding: 20,
    alignItems: 'center',
  },
  detailImage: {
    width: 150,
    height: 150,
    marginBottom: 10,
    borderRadius: 5, // Rounded corners for detail images
  },
  courseDetailTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  courseDetailText: {
    textAlign: 'center',
    marginBottom: 20,
  },
  feesContainer: {
    padding: 20,
    alignItems: 'center',
  },
  paymentContainer: {
    padding: 20,
    alignItems: 'center',
  },
  paymentOptions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  paymentText: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc', // Light border color for payment options
    borderRadius: 5,
    backgroundColor: '#e9ecef', // Light background for payment options
  },
  aboutContainer: {
    padding: 20,
    alignItems: 'center',
  },
  aboutText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#4CAF50', // Button color
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    width: '100%', // Full-width buttons
    marginBottom: 10, // Spacing between buttons
  },
  buttonText: {
    color: '#fff', // White text for buttons
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default App;