import styled from "styled-components";

export const Wrapper = styled.div`
display: flex;
justify-content: space-between;
font-family: san-serif ,Helvetiva, Arial;
padding-bottom: 20px;
border-bottom: 1px solid lightblue;

div {
  flex: 1
}

.information,
.buttons{
  display: flex;
  justify-content: space-between;
}

img {
  width: 80px;
  object-fit: cover;
  margin-left: 40px;
}
`