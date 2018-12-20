package com.populic;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.cmcewen.blurview.BlurViewPackage;
import com.wix.autogrowtextinput.AutoGrowTextInputPackage;
import com.react.rnspinkit.RNSpinkitPackage;
import com.mapbox.rctmgl.RCTMGLPackage;
import com.rnfs.RNFSPackage;
import com.mapbox.reactnativemapboxgl.ReactNativeMapboxGLPackage;
import com.rnmediaeditor.RNMediaEditorPackage;
import fr.greweb.reactnativeviewshot.RNViewShotPackage;
import com.facebook.reactnative.androidsdk.FBSDKPackage;
import fr.greweb.rngl.RNGLPackage;
import com.lwansbrough.RCTCamera.RCTCameraPackage;
import com.brentvatne.react.ReactVideoPackage;
import com.horcrux.svg.SvgPackage;
import com.reactnative.photoview.PhotoViewPackage;
import cl.json.RNSharePackage;
import com.BV.LinearGradient.LinearGradientPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new BlurViewPackage(),
            new AutoGrowTextInputPackage(),
            new RNSpinkitPackage(),
            new RCTMGLPackage(),
            new RNFSPackage(),
            new ReactNativeMapboxGLPackage(),
            new RNMediaEditorPackage(),
            new RNViewShotPackage(),
            new FBSDKPackage(),
            new RNGLPackage(),
            new RCTCameraPackage(),
            new ReactVideoPackage(),
            new SvgPackage(),
            new PhotoViewPackage(),
            new RNSharePackage(),
            new LinearGradientPackage(),
            new VectorIconsPackage()
      );
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
