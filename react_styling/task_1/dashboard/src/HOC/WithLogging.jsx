import React from 'react'

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component'
}

function WithLogging(WrappedComponent) {
  const wrappedComponentName = getDisplayName(WrappedComponent)

  class WithLoggingComponent extends React.Component {
    componentDidMount() {
      console.log(`Component ${wrappedComponentName} is mounted`)
    }

    componentWillUnmount() {
      console.log(`Component ${wrappedComponentName} is going to unmount`)
    }

    render() {
      return <WrappedComponent {...this.props} />
    }
  }

  WithLoggingComponent.displayName = `WithLogging(${wrappedComponentName})`
  return WithLoggingComponent
}

export default WithLogging
