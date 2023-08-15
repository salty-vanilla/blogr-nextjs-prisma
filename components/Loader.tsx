/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';

const SpinAnimation = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const Spinner = styled.div`
  border: 8px solid #f3f3f3;
  border-top: 8px solid #3498db;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: ${SpinAnimation} 1s linear infinite;

  /* 中央配置のためのスタイル */
  position: fixed;  /* <- 追加: viewportに対しての位置を固定 */
  top: 50%;         /* <- 追加: 上から50%の位置に */
  left: 50%;        /* <- 追加: 左から50%の位置に */
  transform: translate(-50%, -50%); /* <- 追加: 自身の50%分移動して中央に配置 */
`;

function Loader() {
    return <Spinner />;
}

export default Loader;
