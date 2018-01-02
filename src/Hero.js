import styled from 'styled-components'

export default styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 600px;
  padding: 30px 0 45px 0;
  text-align: center;

  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 0) 50%,
    rgba(0, 0, 0, 0.65) 100%
  ), url('${props => props.src}') no-repeat center center;
  background-size: cover;
  color: white;

  position: relative;
  &:before {
    content: '\\27E9';
    font-family: 'sans-serif';
    font-size: 2em;
    position: absolute;
    bottom: 15px;
    transform: rotate(90deg) translateY(0px);
    @keyframes float {
      from { transform: rotate(90deg) translateX(0px) }
      to { transform: rotate(90deg) translateX(-4px) }
    }
    animation: 1s ease 0s infinite alternate both running float;
  }
`
