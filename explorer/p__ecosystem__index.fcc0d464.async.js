(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[14],{Brmu:function(e,t,a){"use strict";var d=a("TqRt");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=d(a("q1tI")),n=a("MuoO"),l=d(a("bQr6")),u=e=>{var t=e.ecosystem,a=e.loading,d=t.dataList,n={loading:a.effects["ecosystem/query"],dataSource:d,hideOnSinglePage:!0,scroll:{x:400},pagination:!1};return r.default.createElement("div",null,r.default.createElement(l.default,n))},s=(0,n.connect)(e=>{var t=e.ecosystem,a=e.loading;return{ecosystem:t,loading:a}})(u);t.default=s},bQr6:function(e,t,a){"use strict";var d=a("TqRt");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=d(a("q1tI"));a("g9YV");var n=d(a("wCAj")),l=d(a("pVnL")),u=a("JRPe"),s=d(a("mOP9")),o=d(a("utR0")),i=[{title:r.default.createElement(u.FormattedMessage,{id:"E_ID"}),dataIndex:"id"},{title:r.default.createElement(u.FormattedMessage,{id:"E_NAME"}),dataIndex:"name",render:(e,t)=>r.default.createElement(s.default,{to:{pathname:`/ecosystem/${t.id}`,state:{ecosys_par:null===t.app_params?[]:t.app_params}}},e)},{title:r.default.createElement(u.FormattedMessage,{id:"E_MEMBERS"}),dataIndex:"member"}],c=e=>{var t=Object.assign({},e);return r.default.createElement(n.default,(0,l.default)({},t,{columns:i.map(e=>{return e["align"]="center",e}),rowKey:e=>e.name}))},m=(0,o.default)(c);t.default=m}}]);