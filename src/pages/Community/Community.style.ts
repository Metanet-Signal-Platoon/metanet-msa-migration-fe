import styled from 'styled-components';

export const Component =  styled.div`
    background-color: #F7F8FF;
    height: 100hv;
`;

export const InsertBtn = styled.div`
    position: fixed;
    bottom: 15%;
    cursor: pointer;
    width: 100%;
    display: flex;
    justify-content: flex-end;
    padding: 0px 20px;
`;

export const ListContainer = styled.div`
    padding: 80px 20px 0px 20px;
`;

export const ListItem = styled.div`
    background-color: white;
    padding: 30px;
    margin: 20px 0px;
    border-radius: 20px;
    cursor: pointer;
`;

export const LoadingContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const LoadingMessage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  svg {
    width: 40px;
    height: 40px;
    margin-bottom: 15px;
    animation: spin 1s linear infinite;
  }

  p {
    margin: 5px 0;
    font-size: 16px;
    color: #666;
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;