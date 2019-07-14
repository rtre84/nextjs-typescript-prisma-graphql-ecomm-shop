import Head from 'next/head';
import * as PropTypes from 'prop-types';
import * as React from 'react';
import { ApolloProvider, getDataFromTree } from 'react-apollo';
import initApollo from './initApollo';
import { NextJSPage } from './NextJSPage';
const isBrowser = !!process.browser;
// Gets the display name of a JSX component for dev tools
export function getComponentDisplayName(Component) {
    return Component.displayName || Component.name || 'Unknown';
}
export default (ComposedComponent) => {
    var _a;
    return _a = class WithData extends NextJSPage {
            constructor(props, ctx) {
                super(props, ctx);
                this.apollo = initApollo(this.props.serverState.apollo.data);
            }
            static async getInitialProps(ctx) {
                let serverState = { apollo: {} };
                const apollo = initApollo();
                // Evaluate the composed component's getInitialProps()
                let composedInitialProps = {};
                if (ComposedComponent.getInitialProps) {
                    composedInitialProps = await ComposedComponent.getInitialProps({
                        ...ctx,
                        apollo,
                        isBrowser,
                    });
                }
                // Run all GraphQL queries in the component tree
                // and extract the resulting data
                if (!isBrowser) {
                    // Provide the `url` prop data in case a GraphQL query uses it
                    const url = { query: ctx.query, pathname: ctx.pathname };
                    try {
                        // Run all GraphQL queries
                        await getDataFromTree(<ApolloProvider client={apollo}>
              <ComposedComponent {...{ url, ...composedInitialProps }}/>
            </ApolloProvider>);
                    }
                    catch (error) {
                        // Prevent Apollo Client GraphQL errors from crashing SSR.
                        // Handle them in components via the data.error prop:
                        // http://dev.apollodata.com/react/api-queries.html#graphql-query-data-error
                    }
                    // getDataFromTree does not call componentWillUnmount
                    // head side effect therefore need to be cleared manually
                    Head.rewind();
                    // Extract query data from the Apollo store
                    serverState = {
                        apollo: {
                            data: apollo.cache.extract(),
                        },
                    };
                }
                return {
                    serverState,
                    ...composedInitialProps,
                };
            }
            render() {
                return (<ApolloProvider client={this.apollo}>
          <ComposedComponent {...this.props}/>
        </ApolloProvider>);
            }
        },
        _a.displayName = `WithData(${getComponentDisplayName(ComposedComponent)})`,
        _a.propTypes = {
            serverState: PropTypes.object.isRequired,
        },
        _a;
};
//# sourceMappingURL=withData.jsx.map