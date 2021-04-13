package com.monexoapp;

import android.app.Application;
import android.content.Context;
import com.facebook.react.PackageList;
import com.facebook.react.ReactApplication;
import com.adgydereactlibrary.AdgydeSdkPackage;
import com.imagepicker.ImagePickerPackage;
import com.imagepicker.ImagePickerPackage;
import com.reactnativecommunity.webview.RNCWebViewPackage;
import com.airbnb.android.react.lottie.LottiePackage;
import org.reactnative.camera.RNCameraPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.airbnb.android.react.lottie.LottiePackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.soloader.SoLoader;
import java.lang.reflect.InvocationTargetException;
import java.util.List;
import io.invertase.firebase.RNFirebasePackage;
import io.invertase.firebase.messaging.RNFirebaseMessagingPackage;                       
import io.invertase.firebase.notifications.RNFirebaseNotificationsPackage;
import com.adgyde.android.AdGyde;



public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost =
      new ReactNativeHost(this) {
        @Override
        public boolean getUseDeveloperSupport() {
          return BuildConfig.DEBUG;
        }

        @Override
        protected List<ReactPackage> getPackages() {
          @SuppressWarnings("UnnecessaryLocalVariable")
          List<ReactPackage> packages = new PackageList(this).getPackages();
          // Packages that cannot be autolinked yet can be added manually here, for example:
          // packages.add(new MyReactNativePackage());
          packages.add(new RNHyperSnapSDKBridge());
          //packages.add(new MainReactPackage(),
          //packages.add(new AdgydeSdkPackage());
          //packages.add(new RNFirebasePackage());
          packages.add(new RNFirebaseMessagingPackage());
          packages.add(new RNFirebaseNotificationsPackage());
          //packages.add(new CustomTabsPackage());
          
          return packages;
        }

        @Override
        protected String getJSMainModuleName() {
          return "index";
        }
      };

/**
 * method returns media source(SubPublisher ABC) as string format
 * @return: media source in String format
 */
//String getUtmSource = AdGyde.getUtmSource();

/**
 * method returns campaign name(Campaign ABC) as string format same as channel name written on Adgyde dashboard
 * @return: campaign name in String format
 */
//String getCampaignName = AdGyde.getCampaignName();

/**
 * method returns campaign id (1234) as int format same as provided by adgyde
 * @return: campaign id in int format
 */
//int getCampaignId = AdGyde.getCampaignId();

/**
 * method returns channel name (Publisher ABC) as string format same as channel/partner name integarted with Adgyde
 * @return: channel name in String format
 */
//String getChannelName = AdGyde.getChannelName();


/**
 * method returns channel id(3456) as int format which are provided by Adgyde
 * @return: channel id in int format
 */
//int getChannelId = AdGyde.getChannelId();



  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
    //Example of AdGyde Init Calling
    AdGyde.init(this,"K403247917960182","Organic");
    initializeFlipper(this, getReactNativeHost().getReactInstanceManager());
    
  }

  /**
   * Loads Flipper in React Native templates. Call this in the onCreate method with something like
   * initializeFlipper(this, getReactNativeHost().getReactInstanceManager());
   *
   * @param context
   * @param reactInstanceManager
   */
  private static void initializeFlipper(
      Context context, ReactInstanceManager reactInstanceManager) {
    if (BuildConfig.DEBUG) {
      try {
        /*
         We use reflection here to pick up the class that initializes Flipper,
        since Flipper library is not available in release mode
        */
        Class<?> aClass = Class.forName("com.monexoapp.ReactNativeFlipper");
        aClass
            .getMethod("initializeFlipper", Context.class, ReactInstanceManager.class)
            .invoke(null, context, reactInstanceManager);
      } catch (ClassNotFoundException e) {
        e.printStackTrace();
      } catch (NoSuchMethodException e) {
        e.printStackTrace();
      } catch (IllegalAccessException e) {
        e.printStackTrace();
      } catch (InvocationTargetException e) {
        e.printStackTrace();
      }
    }
  }
}
