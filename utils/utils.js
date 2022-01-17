exports.formattedTopics = topicData => {
  return topicData.map(topic => {
    return [topic.slug, topic.description];
  });
};

exports.formattedUsers = userData => {
  return userData.map(user => {
    return [user.username, user.avatar_url, user.name];
  });
};
