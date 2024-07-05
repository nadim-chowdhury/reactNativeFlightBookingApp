import React, {useEffect, useState} from 'react';
import {View, TextInput, Button, Text, FlatList} from 'react-native';
import {submitReview, getReviews} from '../services/ReviewService';

const ReviewScreen = ({route}) => {
  const {userId, airlineId} = route.params;
  const [rating, setRating] = useState('');
  const [comment, setComment] = useState('');
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState('');

  const handleSubmitReview = async () => {
    try {
      await submitReview(userId, airlineId, rating, comment);
      setRating('');
      setComment('');
      fetchReviews();
    } catch (error) {
      setError('Error submitting review');
    }
  };

  const fetchReviews = async () => {
    try {
      const reviews = await getReviews(airlineId);
      setReviews(reviews);
    } catch (error) {
      setError('Error fetching reviews');
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [airlineId]);

  return (
    <View>
      <TextInput
        placeholder="Enter Rating"
        value={rating}
        onChangeText={setRating}
      />
      <TextInput
        placeholder="Enter Comment"
        value={comment}
        onChangeText={setComment}
      />
      <Button title="Submit Review" onPress={handleSubmitReview} />
      {error ? <Text>{error}</Text> : null}
      <FlatList
        data={reviews}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <View>
            <Text>Rating: {item.rating}</Text>
            <Text>Comment: {item.comment}</Text>
            <Text>Date: {new Date(item.createdAt).toLocaleString()}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default ReviewScreen;
