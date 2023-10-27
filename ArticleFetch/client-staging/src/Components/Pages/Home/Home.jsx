import Alert from '@mui/material/Alert';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { fetchArticleService } from '../../../Services/articleService';
import { AuthContext } from "../../../ContextApi";
import { useContext } from "react";

export const MyCard = ({ data }) => {
  const descriptionWords = data.description.split(' ').slice(0, 7).join(' ');
  const priceStyle = {
    textDecoration: data.price === "0.00" ? 'line-through' : 'none',
    color: data.price === "0.00" ? 'red' : 'inherit',
  };
  return (
    <Container>
      <CardStyle>
        <CardContent>
          <a href={data.amazon_product_url} target="_blank" rel="noopener noreferrer">
          <ImageStyle
            src={data.book_image}
            alt={data.title}
          />
          </a>
          <FieldContainer>
            <Typography variant="h5" component="div">
              {data.title}
            </Typography>
          </FieldContainer>
          <FieldContainer>
            <Typography variant="body2" color="textSecondary">
            <strong>Author:</strong> {data.author}
            </Typography>
          </FieldContainer>
          <FieldContainer>
            <Typography variant="body2" color="textSecondary">
              <strong>Publisher:</strong> {data.publisher}
            </Typography>
          </FieldContainer>
          <FieldContainer>
            <Typography variant="body2" color="textSecondary">
              <div style={priceStyle}>
              <strong>Price:</strong>
              {data.price === 0 ? 'N/A' : `${data.price}`}
              </div>
            </Typography>
          </FieldContainer>
          <FieldContainer>
            <Typography variant="body2" color="textSecondary">
              <strong>Weeks on List:</strong> {data.weeks_on_list}
            </Typography>
          </FieldContainer>
          <FieldContainer>
            <Typography variant="body2" color="textSecondary">
              <strong>Description:</strong> { descriptionWords }...
            </Typography>
          </FieldContainer>
        </CardContent>
      </CardStyle>
    </Container>
  );
};
export default function Home() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const { user } = useContext(AuthContext);
  useEffect(() => {
    if(user._id) {
    const response = fetchArticleService();
    response.then((res) => {
          setData(res.data);
          console.info(res);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
          setError("Unauthorized to access ---Sign Up First---")
        });
      }
      else{
        setError("Unauthorized to access ---Sign Up First---")
      }
  }, [user]);
  return (
<>
  {data ? (
    <div style={containerStyle}>
      {data.map((item, index) => (
        <Grid item key={index}>
          <MyCard data={item} />
        </Grid>
      ))}
    </div>
  ) : error ? (
    <ErrorStyle severity="error">
      Unauthorized to access !
      Try Using SIGNUP
    </ErrorStyle>
  ) : (
    <div style={containerStyle}>
      <p>Loading...</p>
    </div>
  )}
</>
  );
}

const containerStyle ={
  display: 'flex',
  justifyContent: "center",
  flexWrap: 'wrap',
}

const Container = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '10vh',
  padding: '16px',
});

const CardStyle = styled(Card)({
  maxWidth: 200,
    padding: '26px',
    margin: '26px',
    transition: 'transform 0.3s, background 0.3s',

    '&:hover': {
      transform: `scale(${1.05})`,
      background: 'lightblue', // Change the background color on hover
    },
});

const ImageStyle = styled('img')({
  width: '100%',
  height: 'auto',
});

const ErrorStyle = styled(Alert)({
  margin: '50px'
});

const FieldContainer = styled('div')({
  marginBottom: '8px',
});