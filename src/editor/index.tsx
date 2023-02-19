import * as React from "react";
import VM from "./index.vm";
import { Observer } from "mobx-react-lite";
import { useState, useLayoutEffect, useRef, useMemo } from "react";
import { Col, InputNumber, Row, Slider, Space } from "antd";
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
              min={0}
              max={1}
              style={{ margin: "0 16px" }}
              step={0.01}
              value={vm.progressValue}
              onChange={vm.setProgressValue}
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
          <div className="box1">box1</div>
          <div className="box2">box2</div>
          <Button onClick={vm.play}>play</Button>
          <Button onClick={vm.pause}>pause</Button>
          <DecimalStep vm={vm}></DecimalStep>
        </div>
      )}
    </Observer>
  );
};

export default Editor;
