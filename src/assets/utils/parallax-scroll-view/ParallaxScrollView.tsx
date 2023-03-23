/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {Text, View, Image, Animated, ScrollView} from 'react-native';

import {Icon} from 'react-native-elements';

import {
  USER,
  SCREEN_WIDTH,
  SCREEN_HEIGHT,
  DEFAULT_WINDOW_MULTIPLIER,
  DEFAULT_NAVBAR_HEIGHT,
} from './constants';

import styles from './styles';
// import { MAIN_COLOR } from '../../../../assets/constants/colors';

const ScrollViewPropTypes = ScrollView.propTypes;

export default class ParallaxScrollView extends Component {
  constructor() {
    super();

    this.state = {
      scrollY: new Animated.Value(0),
    };
  }

  scrollTo(where) {
    if (!this._scrollView) {
      return;
    }
    this._scrollView.scrollTo(where);
  }

  renderBackground() {
    var {
      windowHeight,
      backgroundSource,
      onBackgroundLoadEnd,
      onBackgroundLoadError,
    } = this.props;
    var {scrollY} = this.state;
    if (!windowHeight || !backgroundSource) {
      return null;
    }

    return (
      <Animated.Image
        style={[
          styles.background,
          {
            height: windowHeight,
            transform: [
              {
                translateY: scrollY.interpolate({
                  inputRange: [-windowHeight, 0, windowHeight],
                  outputRange: [windowHeight / 2, 0, -windowHeight / 3],
                }),
              },
              {
                scale: scrollY.interpolate({
                  inputRange: [-windowHeight, 0, windowHeight],
                  outputRange: [2, 1, 1],
                }),
              },
            ],
          },
        ]}
        source={backgroundSource}
        onLoadEnd={onBackgroundLoadEnd}
        onError={onBackgroundLoadError}
      />
    );
  }

  renderHeaderView() {
    const {
      windowHeight,
      backgroundSource,
      userImage,
      userName,
      userTitle,
      navBarHeight,
    } = this.props;
    const {scrollY} = this.state;
    if (!windowHeight || !backgroundSource) {
      return null;
    }

    const newNavBarHeight = navBarHeight || DEFAULT_NAVBAR_HEIGHT;
    const newWindowHeight = windowHeight - newNavBarHeight;

    return (
      <Animated.View
        style={{
          opacity: scrollY.interpolate({
            inputRange: [
              -windowHeight,
              0,
              windowHeight * DEFAULT_WINDOW_MULTIPLIER + newNavBarHeight,
            ],
            outputRange: [1, 1, 0],
          }),
        }}>
        <View
          style={{
            height: newWindowHeight,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {this.props.headerView || (
            <View>
              <View style={styles.avatarView}>
                <Image
                  source={{uri: userImage || USER.image}}
                  style={{height: 120, width: 120, borderRadius: 60}}
                />
              </View>
              <View style={{paddingVertical: 10}}>
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: 22,
                    color: 'white',
                    paddingBottom: 5,
                  }}>
                  {userName || USER.name}
                </Text>
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: 17,
                    color: 'rgba(247,247, 250, 1)',
                    paddingBottom: 5,
                  }}>
                  {userTitle || USER.title}
                </Text>
              </View>
            </View>
          )}
        </View>
      </Animated.View>
    );
  }

  renderNavBarTitle() {
    const {
      windowHeight,
      backgroundSource,
      navBarTitleColor,
      navBarTitleComponent,
    } = this.props;
    const {scrollY} = this.state;
    if (!windowHeight || !backgroundSource) {
      return null;
    }

    return (
      <Animated.View
        style={{
          opacity: scrollY.interpolate({
            inputRange: [
              -windowHeight,
              windowHeight * DEFAULT_WINDOW_MULTIPLIER,
              windowHeight * 0.8,
            ],
            outputRange: [0, 0, 1],
          }),
        }}>
        {navBarTitleComponent || (
          <View>
            <Text
              style={{
                fontSize: 18,
                fontWeight: '600',
                color: navBarTitleColor || 'white',
              }}>
              {this.props.navBarTitle || USER.name}
            </Text>
          </View>
        )}
      </Animated.View>
    );
  }

  rendernavBar() {
    const {
      windowHeight,
      backgroundSource,
      leftIcon,
      rightIcon,
      leftIconOnPress,
      rightIconOnPress,
      navBarColor,
      navBarHeight,
      leftIconUnderlayColor,
      rightIconUnderlayColor,
    } = this.props;
    const {scrollY} = this.state;
    if (!windowHeight || !backgroundSource) {
      return null;
    }

    const newNavBarHeight = navBarHeight || DEFAULT_NAVBAR_HEIGHT;

    if (this.props.navBarView) {
      return (
        <Animated.View
          style={{
            height: newNavBarHeight,
            width: SCREEN_WIDTH,
            flexDirection: 'row',
            backgroundColor: scrollY.interpolate({
              inputRange: [
                -windowHeight,
                windowHeight * DEFAULT_WINDOW_MULTIPLIER,
                windowHeight * 0.8,
              ],
              outputRange: [
                'transparent',
                'transparent',
                navBarColor || '#e9715d',
              ],

              extrapolate: 'clamp',
            }),
          }}>
          {this.props.navBarView}
        </Animated.View>
      );
    } else {
      return (
        <Animated.View
          style={{
            height: newNavBarHeight,
            width: SCREEN_WIDTH,
            flexDirection: 'row',
            backgroundColor: scrollY.interpolate({
              inputRange: [
                -windowHeight,
                windowHeight * DEFAULT_WINDOW_MULTIPLIER,
                windowHeight * 0.8,
              ],
              outputRange: [
                'transparent',
                'transparent',
                navBarColor || '#e9715d',
              ],
              extrapolate: 'clamp',
            }),
          }}>
          {leftIcon && (
            <Animated.View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Icon
                name={(leftIcon && leftIcon.name) || 'menu'}
                type={(leftIcon && leftIcon.type) || 'simple-line-icon'}
                color={(leftIcon && leftIcon.color) || 'white'}
                size={(leftIcon && leftIcon.size) || 23}
                onPress={leftIconOnPress}
                underlayColor={leftIconUnderlayColor || 'transparent'}
              />
            </Animated.View>
          )}
          <View
            style={{
              flex: 5,
              justifyContent: 'center',
              alignItems: 'center',
              alignSelf: 'center',
            }}>
            {this.renderNavBarTitle()}
          </View>
          {rightIcon && (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Icon
                name={(rightIcon && rightIcon.name) || 'present'}
                type={(rightIcon && rightIcon.type) || 'simple-line-icon'}
                color={(rightIcon && rightIcon.color) || 'white'}
                size={(rightIcon && rightIcon.size) || 23}
                onPress={rightIconOnPress}
                underlayColor={rightIconUnderlayColor || 'transparent'}
              />
            </View>
          )}
        </Animated.View>
      );
    }
  }

  renderDefault() {
    return (
      <View>
        <Text>Contents Go here</Text>
      </View>
    );
  }

  render() {
    const {style, ...props} = this.props;

    return (
      <View style={[styles.container, style]}>
        {this.renderBackground()}
        <View style={{elevation: 5 ,backgroundColor: '#000', borderBottomLeftRadius: 15, borderBottomRightRadius: 15, overflow: 'hidden'}}>
          {this.rendernavBar()}
        </View>
        <Animated.ScrollView
          refreshControl={props.refreshControl}
          ref={component => {
            this._scrollView = component;
          }}
          {...props}
          style={styles.scrollView}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {y: this.state.scrollY}}}],
            {useNativeDriver: false},
          )}
          scrollEventThrottle={16}>
          {this.renderHeaderView()}
          <View style={[styles.content, props.scrollableViewStyle]}>
            {this.props.children || this.renderDefault()}
          </View>
        </Animated.ScrollView>
      </View>
    );
  }
}

ParallaxScrollView.defaultProps = {
  backgroundSource: {uri: 'http://i.imgur.com/6Iej2c3.png'},
  windowHeight: SCREEN_HEIGHT * DEFAULT_WINDOW_MULTIPLIER,
  leftIconOnPress: () => console.log('Left icon pressed'),
  rightIconOnPress: () => console.log('Right icon pressed'),
};

ParallaxScrollView.propTypes = {
  ...ScrollViewPropTypes,
  backgroundSource: PropTypes.any,
  windowHeight: PropTypes.number,
  navBarTitle: PropTypes.string,
  navBarTitleColor: PropTypes.string,
  navBarTitleComponent: PropTypes.node,
  navBarColor: PropTypes.string,
  userImage: PropTypes.string,
  userName: PropTypes.string,
  userTitle: PropTypes.string,
  headerView: PropTypes.node,
  leftIcon: PropTypes.object,
  rightIcon: PropTypes.object,
};
