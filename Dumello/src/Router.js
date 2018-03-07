import React from 'react';
import {
	ActionConst,
	Router,
	Scene,
	Stack,
	Modal,
	Overlay,
	Lightbox
} from 'react-native-router-flux';
// import CardStackStyleInterpolator from 'react-navigation/src/views/CardStack/CardStackStyleInterpolator';
import SplashScreen from './components/SplashScreen';
import HomeScreen from './components/HomeScreen';
import LoginScreen from './components/LoginScreen';
import ProfileScreen from './components/ProfileScreen';
import RecordScreen from './components/RecordScreen';
import SearchScreen from './components/SearchScreen';
import SignUpScreen from './components/SignUpScreen';
import OnboardingScreenProfile from './components/onboarding/OnboardingScreenProfile';
import OnboardingScreen2 from './components/onboarding/OnboardingScreen2';
import OnboardingSelectTags from './components/onboarding/OnboardingSelectTags';
import MessageBar from './components/common/MessageBar';

const RouterComponent = () => {
	return (
		<Router>
			<Overlay>
				<Modal
					hideNavBar
				// transitionConfig={() => ({
				//	screenInterpolator:
				//	CardStackStyleInterpolator.forFadeFromBottomAndroid
				// })}
				>
					<Lightbox>
						<Stack key="root" hideNavBar>
							<Scene
								key="splash"
								component={SplashScreen}
								title="Splash Screen"
								hideNavBar
								tabTitle="Splash"
								initial
							/>
							<Scene key="mainHome" tabs hideTabBar swipeEnabled={false}>
								<Scene
									key="home"
									component={HomeScreen}
									title="Home Screen"
									hideNavBar
								/>
								<Scene
									key="profile"
									component={ProfileScreen}
									title="Profile Screen"
									hideNavBar
								/>
							</Scene>
							<Scene key="mainLogin" tabs hideTabBar>
								<Scene
									key="login"
									component={LoginScreen}
									title="Login Screen"
									hideNavBar
								/>
								<Scene
									key="signUp"
									component={SignUpScreen}
									title="SignUp Screen"
									hideNavBar
								/>
							</Scene>
							<Scene
								key="search"
								component={SearchScreen}
								title="Search Screen"
								hideNavBar
							/>
						</Stack>
						<Scene key="record" component={RecordScreen} />
						<Scene key="tags" component={OnboardingSelectTags} />
						<Scene key="onboardingProfile" component={OnboardingScreenProfile} />
						<Scene key="onboarding2" component={OnboardingScreen2} />
					</Lightbox>
				</Modal>
				<Scene component={MessageBar} />
			</Overlay>
		</Router>
	);
};

export default RouterComponent;
