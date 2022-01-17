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

exports.formattedArticles = articleData => {
  return articleData.map(article => {
    return [
      article.title,
      article.body,
      article.votes,
      article.topic,
      article.author,
      article.created_at,
    ];
  });
};

exports.formattedComments = commentData => {
  return commentData.map(comment => {
    return [
      comment.author,
      comment.article_id,
      comment.votes,
      comment.created_at,
      comment.body,
    ];
  });
};
