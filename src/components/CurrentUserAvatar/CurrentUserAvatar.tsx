import React, {FC} from 'react'

import {useUserContext} from "../../contexts";
import {UserAvatar} from "../UserAvatar";

export const CurrentUserAvatar: FC = () => {
  const {user} = useUserContext()

  if (!user) return null

  return (
    <UserAvatar user={user}/>
  )
}