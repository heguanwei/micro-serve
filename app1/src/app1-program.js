import React from "react";
import ReactDOM from "react-dom";
import singleSpaReact from "single-spa-react";
import Root from "./root.component";
import Routes from "@/route/Route";
import Main from '@/pages/main'
// const lifecycles = singleSpaReact({
//   React,
//   ReactDOM,
//   rootComponent: Routes,   // 该程序的入口文件
//   domElementGetter: () => document.getElementById('app'), // 将程序加载到指定的节点
//   errorBoundary(err, info, props) {
//     // Customize the root error boundary for your microfrontend here.
//     return null;
//   },
// });
//
// export const { bootstrap, mount, unmount } = lifecycles;
ReactDOM.render(<Routes />, document.getElementById('app'))
