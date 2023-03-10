import * as React from "react";
import VM from "./index.vm";
import { Observer } from "mobx-react-lite";
import { useState, useLayoutEffect, useRef, useMemo } from "react";
import { Col, InputNumber, Row, Slider, Space } from "antd";
import cl from "classnames";
import { Button } from "antd";
import gsap from "gsap";
import "./index.css";

const DecimalStep: React.FC<{ vm: VM }> = ({ vm }) => {
  return (
    <Observer>
      {() => (
        <Row>
          <Col span={12}>
            <Slider
              min={0}
              max={1}
              onChange={vm.setProgressValue}
              value={vm.progressValue}
              step={0.01}
            />
          </Col>
          <Col span={4}>
            <InputNumber
              style={{ margin: "0 16px" }}
              value={vm.curTime}
              onChange={vm.setCurTime}
            />
          </Col>
        </Row>
      )}
    </Observer>
  );
};

const Editor = () => {
  const editorRef = useRef();
  const q = gsap.utils.selector(editorRef);
  const vm = useMemo(() => new VM(q), []);

  useLayoutEffect(() => {
    vm.init();
  }, []);

  return (
    <Observer>
      {() => (
        <div className="editor" ref={editorRef}>
          <div className="editorArea">
            {vm.itemList.map((item, index) => (
              <div
                className={cl(
                  "item",
                  vm.selectedIndex > -1 &&
                    (vm.itemList[vm.selectedIndex].id === item.id
                      ? "selected"
                      : "")
                )}
                key={item.id}
                onClick={() => vm.editorItem(item, index)}
              >
                {item.type === "image" && (
                  <img className={cl(item.className, 'aniImg', 'aniItem')} src={item.domProps.src} />
                )}
                {
                  item.type === 'text' && (
                    <div className={cl(item.className, 'aniText', 'aniItem')}>{item.domProps.text}</div>
                  )
                }
              </div>
            ))}
          </div>
          <Button onClick={vm.play}>play</Button>
          <Button onClick={vm.pause}>pause</Button>
          <Button onClick={vm.addPic}>addPic</Button>
          <Button onClick={vm.addText}>addText</Button>
          <DecimalStep vm={vm}></DecimalStep>
          <div className="oprateArea">
            {vm.selectedIndex > -1 && (
              <div>
                <Button onClick={vm.deleteItem}>??????</Button>
              </div>
            )}
          </div>
        </div>
      )}
    </Observer>
  );
};

export default Editor;
