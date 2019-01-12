import {  
    I18nManager , 
    Animated, 
    Easing
}                               from 'react-native';
import Routes                   from './routes';
import { 
    createStackNavigator, 
    createAppContainer 
}                               from "react-navigation";


const sceneProps = (sceneProps) =>{

    const { layout, position, scene } = sceneProps;
    const index = scene.index;
    const inputRange = [index - 1, index, index + 1];
    const width = layout.initWidth;
    const outputRange = I18nManager.isRTL ? ([-width, 0, width * 0.3] ) : ([width, 0, width * -0.3]);

    const opacity = position.interpolate({
      inputRange: [index - 1, index - 0.99, index],
      outputRange: [0, 1, 1],
    });

    const translateX = position.interpolate({
      inputRange,
      outputRange,
    });

    return { opacity, transform: [{ translateX }] };
}


const AppStackNavigator = createStackNavigator(
    Routes,
    {
        initialRouteName: 'Home',
        headerMode: 'none',
        lazy: true,
        transitionConfig: () => ({
          transitionSpec: {
              duration: 500,
              easing: Easing.bezier(0.2833, 0.99, 0.31833, 0.99),
              timing: Animated.timing,
          },
          screenInterpolator : sceneProps
        }),
  }
);

export const  AppContainer = createAppContainer(AppStackNavigator);

