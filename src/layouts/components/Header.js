import React from "react";
import { Row, Input, Col, Select, Icon, message } from "antd";
import Menus from "@components/Menus";
import { injectIntl, intlShape } from "react-intl";
import { name } from "config";
import { setLocale, getLocale } from "umi/locale";
import router from "umi/router";
import Link from "umi/link";
import { request, config, walletAddrToId } from "utils";

import logo from "@public/logo.png";
import china from "@public/china.svg";
import japan from "@public/japan.svg";
import united from "@public/united-states.svg";

const { api } = config;
const { commonSearch } = api;
const Option = Select.Option;
class Header extends React.PureComponent {
    static propTypes = {
        intl: intlShape.isRequired
    };

    componentDidMount() {
        (function() {
            let objs = document.querySelectorAll(
                "#defsearch div.defaultSearch"
            );
            let defsearchObj = document.querySelector("#defsearch");
            let inp = document.querySelector("#searchInput input");
            for (let i = 0; i < objs.length; i++) {
                objs[i].onclick = function() {
                    let val = objs[i].firstChild.lastChild.innerHTML;
                    let link = objs[i].firstChild.lastChild.getAttribute(
                        "action"
                    );
                    inp.value = val;
                    if (defsearchObj.style.display === "block") {
                        defsearchObj.style.display = "none";
                    }
                    router.replace("/" + link);
                };
            }
        })();
    }

    handleChangeLanguage = v => {
        setLocale(v);
    };

    // 开启
    defsearFocus = () => {
        let searobj = document.querySelector("#defsearch");
        if (searobj.style.display === "none") {
            searobj.style.display = "block";
        }
    };

    defsearEnter = e => {
        let defsearchObj = document.querySelector("#defsearch");
        if (defsearchObj.style.display === "block") {
            defsearchObj.style.display = "none";
        }

        let val = e.target.value;
        if (val.length === 0) {
            let {
                intl: { formatMessage }
            } = this.props;
            message.warning(formatMessage({ id: "S_VALUENULL" }));
            return false;
        } else {
            let valString = String(val);
            if (
                valString.length === 18 ||
                valString.length === 19 ||
                valString.length === 20 ||
                valString.length === 24
            ) {
                if (valString.length === 24) {
                    valString = walletAddrToId(valString);
                }
                router.replace(`/ecosystem/1/member/${valString}`);
                return false;
            }

            let args = {
                head: {
                    version: "1.0",
                    msgtype: "request",
                    interface: "get_common_search",
                    remark: ""
                },
                params: {
                    cmd: "001"
                }
            };

            let v = "";
            if (val.length === 64) {
                args.params["hash"] = val;
                v = val;
            } else {
                args.params["block_id"] = Number(val);
                v = Number(val);
            }

            let options = { url: commonSearch, method: "POST", data: args };

            request(options)
                .then(resolve => {
                    if (resolve.success) {
                        let { ret_data_type, retcode, data } = resolve.body;
                        if (retcode === 200 && data === null) {
                            let {
                                intl: { formatMessage }
                            } = this.props;
                            message.error(formatMessage({ id: "S_NotFound" }));
                            return false;
                        }
                        if (parseInt(ret_data_type, 10) === 1) {
                            router.replace(`/block/${data.header.block_id}`);
                        } else if (parseInt(ret_data_type, 10) === 2) {
                            router.replace(`/transaction/${v}`);
                        }
                    }
                })
                .catch(reject => {
                    message.error(reject, "line 82");
                });
        }
    };
    render() {
        let {
            intl: { formatMessage }
        } = this.props;
        return (
            <Row>
                <Row style={{ background: "#004b80" }} justify="start">
                    <Col id="logo" xs={6} ms={4} md={2} xl={2} xxl={5}>
                        <Link to="/dashboard" replace>
                            <Col xs={24} ms={24} md={24} xl={24} xxl={4}>
                                <img
                                    alt=""
                                    src={logo}
                                    width={40}
                                    style={{ paddingTop: "0.3rem" }}
                                />
                            </Col>
                            <Col xs={0} ms={0} md={0} xl={0} xxl={20}>
                                {name}
                            </Col>
                        </Link>
                    </Col>
                    <Col xs={10} ms={16} md={18} xl={19} xxl={15}>
                        <Menus />
                    </Col>
                    <Col
                        xs={8}
                        ms={4}
                        md={4}
                        xl={3}
                        xxl={4}
                        style={{ paddingTop: "0.5rem" }}
                    >
                        <Select
                            defaultValue={getLocale()}
                            onChange={v => {
                                this.handleChangeLanguage(v);
                            }}
                            className="selectLang"
                        >
                            <Option value="zh-CN">
                                <Icon component={china} />
                                {/* <span style={{ paddingLeft: "0.3rem" }}>
                                    中文
                                </span> */}
                            </Option>
                            <Option value="en-US">
                                <Icon component={united} />
                                {/* <span style={{ paddingLeft: "0.3rem" }}>
                                    English
                                </span> */}
                            </Option>
                            <Option value="ja-JP">
                                <Icon component={japan} />
                                {/* <span style={{ paddingLeft: "0.3rem" }}>
                                    日本语
                                </span> */}
                            </Option>
                        </Select>
                    </Col>
                </Row>

                <Row id="searchInput">
                    <Input
                        placeholder={formatMessage({ id: "S_T" })}
                        size="default"
                        onPressEnter={this.defsearEnter}
                        // onFocus={this.defsearFocus}
                        // onBlur={this.defsearBlur}
                    />
                </Row>
                <Row id="defsearch" style={{ display: "none" }}>
                    <div className="defaultSearch" key="1">
                        <div>
                            <Icon type="block" />
                            <span action="block">显示所有区块信息</span>
                        </div>
                    </div>
                    <div className="defaultSearch" key="2">
                        <div>
                            <Icon type="file-sync" />
                            <span action="transaction">显示所有交易信息</span>
                        </div>
                    </div>
                    <div className="defaultSearch" key="3">
                        <div>
                            <Icon type="share-alt" />
                            <span action="node">显示所有节点信息</span>
                        </div>
                    </div>
                    <div className="defaultSearch" key="4">
                        <div>
                            <Icon type="global" />
                            <span action="ecosystem">显示所有生态系统</span>
                        </div>
                    </div>
                    <div className="defaultSearch" key="5">
                        <div>
                            <Icon type="profile" />
                            <span action="system_param">显示所有系统参数</span>
                        </div>
                    </div>
                </Row>
            </Row>
        );
    }
}

export default injectIntl(Header);
