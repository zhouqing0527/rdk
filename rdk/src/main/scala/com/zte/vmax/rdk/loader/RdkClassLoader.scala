package com.zte.vmax.rdk.loader

import java.net.{URL, URLClassLoader}

/**
  * Created by 10054860 on 2016/11/22.
  */
class RdkClassLoader(appName: String) extends URLClassLoader(Array.empty) {
  override def addURL(url: URL) = {
    super.addURL(url)
  }

}