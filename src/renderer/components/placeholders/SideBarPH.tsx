import PlaceholderLoading from 'react-placeholder-loading';
import styled from 'styled-components';

const StyledContainer = styled.div`
  display: flex;
  margin: 0 10px;
  width: calc(100% - 20px);
  align-items: center;
`;

const StyledCircle = styled.div`
  width: 56px;
  height: 56px;
  margin-right: 10px;
`;

const StyledLines = styled.div`
  flex-grow: 1;
  width: calc(100% - 56px - 10px);
}
`;

function SideBarPH() {
  return (
    <StyledContainer>
      <StyledCircle>
        <PlaceholderLoading shape="circle" width={60} height={60} />
      </StyledCircle>
      <StyledLines>
        <PlaceholderLoading shape="rect" height={15} width={274} />
        <div style={{ height: '5px' }} />
        <PlaceholderLoading shape="rect" height={15} width={274} />
      </StyledLines>
    </StyledContainer>
  );
}

export default SideBarPH;
