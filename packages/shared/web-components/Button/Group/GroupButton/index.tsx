import React from 'react'

import { ActionIconButton } from '../../ActionIconButton'
import { useActiveButton } from '../context'
import { GroupButtonProps } from './types'

const GroupButton: React.FC<GroupButtonProps> = ({
  name,
  icon,
  label,
  width
}) => {
  const [isActive, selectButton] = useActiveButton(name)

  return (
    <ActionIconButton
      className={isActive && 'active'}
      onClick={selectButton}
      {...{ icon, label, width }}
    />
  )
}

export default GroupButton
