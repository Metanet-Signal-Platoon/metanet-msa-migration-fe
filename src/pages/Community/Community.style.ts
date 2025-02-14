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
  height: calc(100vh - 200px);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const LoadingMessage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
  border-radius: 15px;
  padding: 30px 50px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);

  svg {
    margin-bottom: 15px;
    animation: spin 1.5s linear infinite;
  }

  p {
    margin: 5px 0;
    font-size: 16px;
    color: #666;
    text-align: center;
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