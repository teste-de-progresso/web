import React, { FC } from "react";
import {
  List,
  ListItem,
  Divider,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
  ListItemSecondaryAction,
  Icon,
} from "@material-ui/core";

import { MdComment, MdDone, MdWarning } from "react-icons/md";

import { Card } from "../../../components";
import { ReviewFeedback } from "../../../graphql/__generated__/graphql-schema";

type Porps = {
  feedbacks: readonly ReviewFeedback[]
}

export const QuestionFeedback: FC<Porps> = ({ feedbacks }) => (
  <Card title="Revisões">
    {feedbacks.length ? (
      <List>
        {feedbacks.map((feedback, index) => {
          const isLast = feedbacks.length - 1 === index;
          return (
            <Feedback
              feedback={feedback}
              key={`feedback-${feedback.id}`}
              isLast={isLast}
            />
          );
        })}
      </List>
    ) : (
      <div>Ainda não foi feita nenhuma revisão</div>
    )}
  </Card>
);

type FeedbackProps = {
  feedback: ReviewFeedback
  isLast: boolean
}

const FEEDBACK_ICON = {
  comment: <MdComment color="#586069" />,
  approve: <MdDone color="#22863a" />,
  request_change: <MdWarning color="#cb2431" />,
};

const Feedback: FC<FeedbackProps> = ({ feedback, isLast }) => {
  const { user } = feedback;
  const avatarUrl = process.env.REACT_APP_BACKEND_URL ?? "" + user?.avatarUrl ?? "";

  return (
    <>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt={user.name ?? ""} src={avatarUrl} />
        </ListItemAvatar>
        <ListItemText
          primary={user.name}
          secondary={(
            <>
              <Typography component="span" variant="body2" color="textPrimary">
                {feedback.comment}
              </Typography>
            </>
          )}
        />
        <ListItemSecondaryAction>
          <Icon aria-label="comments">
            {FEEDBACK_ICON[feedback.status]}
          </Icon>
        </ListItemSecondaryAction>
      </ListItem>
      {!isLast && <Divider />}
    </>
  );
};
