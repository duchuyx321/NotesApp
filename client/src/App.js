import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { PublicRouters, PrivateRouters } from "./routers";
import DefaultLayout from "~/layouts/DefaultLayout";
import { ContextProvider } from "./hooks/useContext";

function App() {
    return (
        <ContextProvider>
            <Router>
                <div className="App">
                    <Routes>
                        {PublicRouters.map((item, index) => {
                            const Page = item.component;
                            return (
                                <Route
                                    key={index}
                                    path={item.path}
                                    element={
                                        <DefaultLayout>
                                            <Page />
                                        </DefaultLayout>
                                    }
                                />
                            );
                        })}

                        {PrivateRouters.map((item, index) => {
                            const Page = item.component;
                            let Layout = item.layout;
                            return (
                                <Route
                                    key={index}
                                    path={item.path}
                                    element={
                                        <Layout>
                                            <Page />
                                        </Layout>
                                    }
                                />
                            );
                        })}
                    </Routes>
                </div>
            </Router>
        </ContextProvider>
    );
}

export default App;
