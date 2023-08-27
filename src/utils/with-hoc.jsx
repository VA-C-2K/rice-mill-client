export default function withHOC(Provider, Component) {
  return function WrappedComponent(props) {
    return (
      <Provider {...props}>
        <Component {...props} />
      </Provider>
    );
  };
}
