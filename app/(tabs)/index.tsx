import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Sun, Moon, Cloud, CloudRain, Sparkles, Shield } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

// TypeScript interfaces
interface MoodType {
  image: any;
  label: string;
  color: string;
  icon: any;
}

// FIXED: Try these path options in order of priority

// Option 1: From project root (try this first)
const moodImages = {
  happy: require('../../assets/images/moods/happy.png'),
  excited: require('../../assets/images/moods/excited.png'),
  playful: require('../../assets/images/moods/loving.png'),
  angry: require('../../assets/images/moods/angry.png'),
  sad: require('../../assets/images/moods/sad.png'),
  surprised: require('../../assets/images/moods/confused.png'),
  tired: require('../../assets/images/moods/tired.png'),
  silly: require('../../assets/images/moods/anxious.png'),
};

// Option 2: If Option 1 fails, uncomment this and comment Option 1
/* const moodImages = {
  happy: require('../../assets/images/moods/happy.png'),
  excited: require('../../assets/images/moods/excited.png'),
  playful: require('../../assets/images/moods/playful.png'),
  angry: require('../../assets/images/moods/angry.png'),
  sad: require('../../assets/images/moods/sad.png'),
  surprised: require('../../assets/images/moods/surprised.png'),
  tired: require('../../assets/images/moods/tired.png'),
  silly: require('../../assets/images/moods/silly.png'),
}; */

// Option 3: If both above fail, try without going up directories
/* const moodImages = {
  happy: require('assets/images/moods/happy.png'),
  excited: require('assets/images/moods/excited.png'),
  playful: require('assets/images/moods/playful.png'),
  angry: require('assets/images/moods/angry.png'),
  sad: require('assets/images/moods/sad.png'),
  surprised: require('assets/images/moods/surprised.png'),
  tired: require('assets/images/moods/tired.png'),
  silly: require('assets/images/moods/silly.png'),
}; */

// Option 4: Fallback - Use placeholder images if files don't exist
/* const moodImages = {
  happy: require('react-native/Libraries/NewAppScreen/components/logo.png'), // Default RN image
  excited: require('react-native/Libraries/NewAppScreen/components/logo.png'),
  playful: require('react-native/Libraries/NewAppScreen/components/logo.png'),
  angry: require('react-native/Libraries/NewAppScreen/components/logo.png'),
  sad: require('react-native/Libraries/NewAppScreen/components/logo.png'),
  surprised: require('react-native/Libraries/NewAppScreen/components/logo.png'),
  tired: require('react-native/Libraries/NewAppScreen/components/logo.png'),
  silly: require('react-native/Libraries/NewAppScreen/components/logo.png'),
}; */

const moods: MoodType[] = [
  { 
    image: moodImages.happy, 
    label: 'Happy', 
    color: '#FF6B9D', 
    icon: Sun 
  },
  { 
    image: moodImages.excited, 
    label: 'Excited',   
    color: '#FF8A95', 
    icon: Sparkles 
  },
  { 
    image: moodImages.playful, 
    label: 'Playful', 
    color: '#FFB3BA', 
    icon: Sun 
  },
  { 
    image: moodImages.sad, 
    label: 'Sad', 
    color: '#D63384', 
    icon: CloudRain 
  },
  { 
    image: moodImages.angry, 
    label: 'Angry', 
    color: '#DC143C', 
    icon: Cloud 
  },
  { 
    image: moodImages.surprised, 
    label: 'Surprised', 
    color: '#FF69B4', 
    icon: Sparkles 
  },
  { 
    image: moodImages.tired, 
    label: 'Tired', 
    color: '#B85450', 
    icon: Moon 
  },
  { 
    image: moodImages.silly, 
    label: 'Silly', 
    color: '#FF1493', 
    icon: Sun 
  },
];

export default function HomeScreen() {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [realTalkMode, setRealTalkMode] = useState<boolean>(false);
  const [moodIntensity, setMoodIntensity] = useState<number>(3);

  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const handleMoodSelection = (moodLabel: string): void => {
    setSelectedMood(moodLabel);
  };

  const handleIntensityChange = (level: number): void => {
    setMoodIntensity(level);
  };

  const handleRealTalkToggle = (): void => {
    setRealTalkMode(!realTalkMode);
  };

  const handleJournalEntry = (): void => {
    console.log('Add journal entry pressed');
  };

  const handleQuickNote = (): void => {
    console.log('Quick note pressed');
  };

  const renderMoodCard = (mood: MoodType, index: number) => {
    const isSelected = selectedMood === mood.label;
    const IconComponent = mood.icon;
    
    return (
      <TouchableOpacity
        key={index}
        style={[
          styles.moodCard,
          isSelected && styles.moodCardSelected,
          { backgroundColor: isSelected ? mood.color + '40' : 'white' }
        ]}
        onPress={() => handleMoodSelection(mood.label)}
        activeOpacity={0.7}
      >
        {/* FIXED: Better error handling for images */}
        <View style={styles.moodIconContainer}>
          <Image 
            source={mood.image} 
            style={styles.moodImage}
            resizeMode="contain"
            onError={(error) => {
              console.log(`Failed to load image for ${mood.label}:`, error.nativeEvent.error);
            }}
            onLoad={() => {
              console.log(`Successfully loaded image for ${mood.label}`);
            }}
          />
        </View>
        <Text style={styles.moodLabel}>{mood.label}</Text>
      </TouchableOpacity>
    );
  };

  const renderIntensityDot = (level: number) => (
    <TouchableOpacity
      key={level}
      style={[
        styles.intensityDot,
        moodIntensity >= level && styles.intensityDotActive
      ]}
      onPress={() => handleIntensityChange(level)}
      activeOpacity={0.7}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#FFE5F1', '#E8F4FD', '#F0F8E8']}
        style={styles.gradient}
      >
        <ScrollView 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.greeting}>Good morning! ☀️</Text>
            <Text style={styles.date}>{currentDate}</Text>
          </View>

          {/* RealTalk Toggle */}
          <View style={styles.realTalkContainer}>
            <View style={styles.realTalkHeader}>
              <Shield size={20} color="#FF6B9D" />
              <Text style={styles.realTalkTitle}>RealTalk Mode</Text>
            </View>
            <TouchableOpacity
              style={[styles.toggle, realTalkMode && styles.toggleActive]}
              onPress={handleRealTalkToggle}
              activeOpacity={0.8}
            >
              <View style={[styles.toggleThumb, realTalkMode && styles.toggleThumbActive]} />
            </TouchableOpacity>
          </View>

          {realTalkMode && (
            <View style={styles.realTalkMessage}>
              <Text style={styles.realTalkText}>
                Safe space activated. Express your true feelings without judgment. 💙
              </Text>
            </View>
          )}

          {/* Mood Question */}
          <View style={styles.questionContainer}>
            <Text style={styles.question}>How are you feeling right now?</Text>
            <Text style={styles.subQuestion}>Choose what resonates with you</Text>
          </View>

          {/* Mood Grid */}
          <View style={styles.moodGrid}>
            {moods.map((mood, index) => renderMoodCard(mood, index))}
          </View>

          {/* Intensity Slider */}
          {selectedMood && (
            <View style={styles.intensityContainer}>
              <Text style={styles.intensityTitle}>How intense is this feeling?</Text>
              <View style={styles.intensitySlider}>
                {[1, 2, 3, 4, 5].map((level) => renderIntensityDot(level))}
              </View>
              <View style={styles.intensityLabels}>
                <Text style={styles.intensityLabel}>Mild</Text>
                <Text style={styles.intensityLabel}>Intense</Text>
              </View>
            </View>
          )}

          {/* Emotional Sharing Options */}
          {selectedMood && (
            <View style={styles.sharingContainer}>
              <Text style={styles.sharingTitle}>Share your emotions with...</Text>
              <Text style={styles.sharingSubtitle}>Choose how you'd like to express yourself</Text>
              
              <View style={styles.sharingOptions}>
                <TouchableOpacity 
                  style={styles.sharingOption}
                  onPress={handlePrivateReflection}
                  activeOpacity={0.8}
                >
                  <View style={[styles.sharingIconContainer, { backgroundColor: '#E6FFFA' }]}>
                    <Edit3 size={24} color="#38B2AC" />
                  </View>
                  <View style={styles.sharingContent}>
                    <Text style={styles.sharingOptionTitle}>📝 Just for Me</Text>
                    <Text style={styles.sharingOptionDescription}>
                      Privately reflect and keep it with yourself
                    </Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity 
                  style={styles.sharingOption}
                  onPress={handleCloseCircleShare}
                  activeOpacity={0.8}
                >
                  <View style={[styles.sharingIconContainer, { backgroundColor: '#EBF8FF' }]}>
                    <Users size={24} color="#4299E1" />
                  </View>
                  <View style={styles.sharingContent}>
                    <Text style={styles.sharingOptionTitle}>👥 Close Circle</Text>
                    <Text style={styles.sharingOptionDescription}>
                      Share with your trusted friends only
                    </Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity 
                  style={styles.sharingOption}
                  onPress={handleOpenShare}
                  activeOpacity={0.8}
                >
                  <View style={[styles.sharingIconContainer, { backgroundColor: '#F0FFF4' }]}>
                    <Globe size={24} color="#48BB78" />
                  </View>
                  <View style={styles.sharingContent}>
                    <Text style={styles.sharingOptionTitle}>🌍 Open to All</Text>
                    <Text style={styles.sharingOptionDescription}>
                      Let others feel and respond to your emotion
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          )}

          {/* Today's Encouragement */}
          <View style={styles.encouragementCard}>
            <Text style={styles.encouragementTitle}>Today's Gentle Reminder</Text>
            <Text style={styles.encouragementText}>
              "Your feelings are valid, and it's okay to feel whatever you're experiencing right now. 
              You're doing better than you think. 💕"
            </Text>
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  header: {
    padding: 20,
    paddingTop: 10,
  },
  greeting: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2D3748',
    marginBottom: 4,
  },
  date: {
    fontSize: 16,
    fontWeight: '400',
    color: '#718096',
  },
  realTalkContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 10,
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  realTalkHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  realTalkTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2D3748',
    marginLeft: 8,
  },
  toggle: {
    width: 50,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#E2E8F0',
    justifyContent: 'center',
    paddingHorizontal: 2,
  },
  toggleActive: {
    backgroundColor: '#FF6B9D',
  },
  toggleThumb: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  toggleThumbActive: {
    alignSelf: 'flex-end',
  },
  realTalkMessage: {
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 16,
    backgroundColor: '#E6FFFA',
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#38B2AC',
  },
  realTalkText: {
    fontSize: 14,
    fontWeight: '400',
    color: '#2D3748',
    lineHeight: 20,
  },
  questionContainer: {
    padding: 20,
    paddingBottom: 10,
  },
  question: {
    fontSize: 22,
    fontWeight: '600',
    color: '#2D3748',
    textAlign: 'center',
    marginBottom: 4,
  },
  subQuestion: {
    fontSize: 14,
    fontWeight: '400',
    color: '#718096',
    textAlign: 'center',
  },
  moodGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
  moodCard: {
    width: (width - 60) / 4,
    aspectRatio: 1,
    backgroundColor: 'white',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  moodCardSelected: {
    borderWidth: 2,
    borderColor: '#FF6B9D',
  },
  moodIconContainer: {
    marginBottom: 4,
  },
  moodImage: {
    width: 40,
    height: 40,
  },
  moodIcon: {
    // Fallback icon styles if needed
  },
  moodLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: '#2D3748',
    textAlign: 'center',
  },
  intensityContainer: {
    margin: 20,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  intensityTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2D3748',
    textAlign: 'center',
    marginBottom: 20,
  },
  intensitySlider: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  intensityDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#E2E8F0',
  },
  intensityDotActive: {
    backgroundColor: '#FF6B9D',
  },
  intensityLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  intensityLabel: {
    fontSize: 12,
    fontWeight: '400',
    color: '#718096',
  },
  quickActions: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  actionButton: {
    flex: 1,
    backgroundColor: '#FF6B9D',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginHorizontal: 6,
  },
  actionButtonSecondary: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#FF6B9D',
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: 'white',
  },
  actionButtonTextSecondary: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FF6B9D',
  },
  encouragementCard: {
    margin: 20,
    marginTop: 8,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  encouragementTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2D3748',
    marginBottom: 8,
  },
  encouragementText: {
    fontSize: 14,
    fontWeight: '400',
    color: '#4A5568',
    lineHeight: 20,
  },
});