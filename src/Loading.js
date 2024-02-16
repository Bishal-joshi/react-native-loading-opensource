import React, { useEffect, useRef } from 'react';
import { View, Text, Animated, Easing, StyleSheet } from 'react-native';

const Loading = () => {
  const spinValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const spinAnimation = Animated.loop(
      Animated.timing(spinValue, {
        toValue: 360, // Change to a higher number for continuous spinning
        duration: 2000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );

    spinAnimation.start();

    return () => spinAnimation.stop();
  }, [spinValue]);

  const spin = spinValue.interpolate({
    inputRange: [0, 360],
    outputRange: ['0deg', '360deg'],
  });

  const renderBells = () => {
    const bellRadius = 20;
    const numberOfBells = 8;
    const angleIncrement = (2 * Math.PI) / numberOfBells;

    return Array.from({ length: numberOfBells }).map((_, index) => {
      const angle = index * angleIncrement;
      const translateX = Math.cos(angle) * 40; // Adjust the radius for the desired distance from the center
      const translateY = Math.sin(angle) * 40;

      return (
        <Animated.View
          key={index}
          style={[
            styles.bell,
            { transform: [{ rotate: spin }, { translateX }, { translateY }] },
          ]}
        />
      );
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.spinner}>
        <Text style={styles.loadingText}>⌛</Text>
        {renderBells()}
      </View>
      <Text style={styles.staticText}>Loading...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  spinner: {
    position: 'relative',
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3498db',
    borderRadius: 50,
  },
  bell: {
    position: 'absolute',
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#ffffff',
  },
  loadingText: {
    fontSize: 32,
    color: '#ffffff',
  },
  staticText: {
    fontSize: 16,
    color: '#3498db',
    marginTop: 10,
  },
});

export default Loading;
