import React, {Component} from "react";
import ReactDOM from "react-dom";
import {Link} from 'react-router-dom';
import singleSpaReact from "single-spa-react";
import {registerApplication, start} from "single-spa";

const runScript = async (url) => {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = url;
        script.onload = resolve;
        script.onerror = reject;
        const firstScript = document.getElementsByTagName('script')[0];
        firstScript.parentNode.insertBefore(script, firstScript);
    });
}
const runCss = async (url) => {
    return new Promise((resolve, reject) => {
        const link = document.createElement('link');
        link.href = url;
        link['rel'] = 'stylesheet';
        link.onload = resolve;
        link.onerror = reject;
        const head = document.getElementsByTagName('head')[0];
        head.appendChild(link);
    });
}

registerApplication( //注册微前端服务
    {
        name: '@app1/program',
        app: async () => {
            await runCss('http://localhost:9001/main.css');
            // await runScript('http://localhost:9001/app1-program.js');
            return System.import('@app1/program');
        },
        activeWhen: location => location.pathname.startsWith('/app1') // 配置微前端模块前缀
    }
);
// registerApplication({
//     name: "@app1/program",
//     app: () => System.import("@app1/program"),
//     activeWhen: location => {
//         return location.pathname.startsWith('/app1');
//     }
// });
registerApplication({
    name: "@app2/program2",
    app: () => System.import("@app2/program2"),
    activeWhen: location => location.pathname.startsWith('/app2'),
});
registerApplication({
    name: "@app3/program3",
    app: () => System.import("@app3/program3"),
    activeWhen: location => location.pathname.startsWith('/app3'),
});

start({
    urlRerouteOnly: true,
});