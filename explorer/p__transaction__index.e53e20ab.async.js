(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[6],{"4Q3T":function(e,t,a){"use strict";var l=a("TqRt");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=l(a("q1tI"));a("g9YV");var d=l(a("wCAj")),n=l(a("pVnL"));a("14J3");var u=l(a("BMrR"));a("+BJd");var o=l(a("mr32"));a("5Dmo");var c=l(a("3S7+")),i=a("JRPe"),f=l(a("wd/R")),s=l(a("mOP9")),m=e=>{var t=Object.assign({},e),a=[{title:r.default.createElement(i.FormattedMessage,{id:"TL_HASH"}),dataIndex:"hash",render:(e,t)=>{return t.BlockID,r.default.createElement(c.default,{placement:"topLeft",title:e},r.default.createElement(s.default,{to:`transaction/${t.hash}`},r.default.createElement("span",{id:"textOverflow"},e)))}},{title:r.default.createElement(i.FormattedMessage,{id:"TL_BLOCKID"}),dataIndex:"block_id",render:(e,t)=>{return Number(e)>0?r.default.createElement(s.default,{to:`block/${t.block_id}`},r.default.createElement("span",null,e)):r.default.createElement("span",{id:"failure"},r.default.createElement(i.FormattedMessage,{id:"ME_FAILYRE"}))}},{title:r.default.createElement(i.FormattedMessage,{id:"TL_TYPE"}),dataIndex:"type",render:e=>{return 276===e?r.default.createElement(o.default,{color:"blue"},r.default.createElement(i.FormattedMessage,{id:"TYPE_TRANSFER"})):293===e?r.default.createElement(o.default,{color:"green"},r.default.createElement(i.FormattedMessage,{id:"TYPE_CREATEUSER"})):264===e?r.default.createElement(o.default,{color:"magenta"},r.default.createElement(i.FormattedMessage,{id:"TYPE_TASK"})):e}},{title:r.default.createElement(i.FormattedMessage,{id:"TL_WALLET"}),dataIndex:"key_id",render:e=>{return r.default.createElement(c.default,{placement:"topLeft",title:e},r.default.createElement("span",{id:"textOverflow",onClick:()=>{t.onToggle("key_id")}},e))}},{title:r.default.createElement(i.FormattedMessage,{id:"TL_CREATETIME"}),dataIndex:"time",render:e=>r.default.createElement(u.default,null,r.default.createElement(o.default,{color:"#108ee9"},(0,f.default)(1e3*e).fromNow(!1)))}];return r.default.createElement(d.default,(0,n.default)({rowKey:e=>e.hash,columns:a.map(e=>{return e["align"]="center",e})},t))},E=m;t.default=E},T6Na:function(e,t,a){"use strict";var l=a("TqRt");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=l(a("q1tI")),d=l(a("4Q3T")),n=a("MuoO"),u=e=>{var t=e.transaction,a=e.dispatch,l=e.loading,n=t.dataList,u=t.total;function o(e){a({type:"transaction/toggle",payload:{index:e}})}var c={dataSource:n,loading:l.effects["transaction/query"],onToggle:o,scroll:{x:900},pagination:{showQuickJumper:!0,total:Number(u),onChange(e,t){var l={head:{version:"1.0",msgtype:"request",interface:"get_transaction_block",remark:""},params:{cmd:"001",current_page:e||1,page_size:t||10}};a({type:"transaction/queryTransactionByBlock",payload:l})}}};return r.default.createElement("div",null,r.default.createElement(d.default,c))},o=(0,n.connect)(e=>e)(u);t.default=o}}]);