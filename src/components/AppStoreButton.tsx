import $$AppStoreButton from '!!raw-loader!../assets/app-store-button.svg'
import { animations, selectors } from 'promptu'
import React, { PropsWithChildren, ReactElement } from 'react'
import styled from 'styled-components'

type Props = PropsWithChildren<{
  className?: string
}>

function AppStoreButton({ className }: Props): ReactElement {
  return (
    <StyledRoot className={className} href={__APP_CONFIG__.appStoreUrl} dangerouslySetInnerHTML={{ __html: $$AppStoreButton }}/>
  )
}

export default AppStoreButton

const StyledRoot = styled.a`
  height: 6rem;
  width: auto;

  svg * {
    ${animations.transition('fill', 50)}
  }

  ${selectors.hwot} {
    svg * {
      fill: ${props => props.theme.colors.purple};
    }
  }
`
