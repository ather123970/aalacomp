import { createHotContext as __vite__createHotContext } from "/@vite/client";import.meta.hot = __vite__createHotContext("/src/route.jsx");import __vite__cjsImport0_react_jsxDevRuntime from "/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=fb55e1cc"; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
import __vite__cjsImport1_react from "/node_modules/.vite/deps/react.js?v=fb55e1cc"; const React = __vite__cjsImport1_react.__esModule ? __vite__cjsImport1_react.default : __vite__cjsImport1_react;
import { createBrowserRouter, RouterProvider, Outlet, Link } from "/node_modules/.vite/deps/react-router-dom.js?v=fb55e1cc";
import Home from "/src/pages/Home.jsx";
import Products from "/src/pages/products.jsx";
import ProductDetail from "/src/pages/ProductDetail.jsx";
import Deal from "/src/pages/Deal.jsx";
import About from "/src/About.jsx";
import Cart from "/src/cart.jsx";
import Profile from "/src/pages/Profile.jsx";
import AuthPage from "/public/loreg.jsx";
import Checkout from "/src/pages/Checkout.jsx";
import DealDetail from "/src/pages/Dealdetail.jsx";
const Layout = () => /* @__PURE__ */ jsxDEV("div", { children: [
  /* @__PURE__ */ jsxDEV("nav", { className: "p-4 border-b", children: [
    /* @__PURE__ */ jsxDEV(Link, { to: "/", className: "mr-4", children: "Home" }, void 0, false, {
      fileName: "C:/Users/MicroZaib/OneDrive/Desktop/aalacomp-main/src/route.jsx",
      lineNumber: 16,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV(Link, { to: "/products", className: "mr-4", children: "Products" }, void 0, false, {
      fileName: "C:/Users/MicroZaib/OneDrive/Desktop/aalacomp-main/src/route.jsx",
      lineNumber: 17,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV(Link, { to: "/deal", className: "mr-4", children: "Deal" }, void 0, false, {
      fileName: "C:/Users/MicroZaib/OneDrive/Desktop/aalacomp-main/src/route.jsx",
      lineNumber: 18,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV(Link, { to: "/contact", children: "About" }, void 0, false, {
      fileName: "C:/Users/MicroZaib/OneDrive/Desktop/aalacomp-main/src/route.jsx",
      lineNumber: 19,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "C:/Users/MicroZaib/OneDrive/Desktop/aalacomp-main/src/route.jsx",
    lineNumber: 15,
    columnNumber: 5
  }, this),
  /* @__PURE__ */ jsxDEV("main", { children: /* @__PURE__ */ jsxDEV(Outlet, {}, void 0, false, {
    fileName: "C:/Users/MicroZaib/OneDrive/Desktop/aalacomp-main/src/route.jsx",
    lineNumber: 22,
    columnNumber: 7
  }, this) }, void 0, false, {
    fileName: "C:/Users/MicroZaib/OneDrive/Desktop/aalacomp-main/src/route.jsx",
    lineNumber: 21,
    columnNumber: 5
  }, this)
] }, void 0, true, {
  fileName: "C:/Users/MicroZaib/OneDrive/Desktop/aalacomp-main/src/route.jsx",
  lineNumber: 14,
  columnNumber: 1
}, this);
_c = Layout;
export const router = createBrowserRouter(
  [
    {
      path: "/",
      element: /* @__PURE__ */ jsxDEV(Layout, {}, void 0, false, {
        fileName: "C:/Users/MicroZaib/OneDrive/Desktop/aalacomp-main/src/route.jsx",
        lineNumber: 30,
        columnNumber: 12
      }, this),
      children: [
        { index: true, element: /* @__PURE__ */ jsxDEV(Home, {}, void 0, false, {
          fileName: "C:/Users/MicroZaib/OneDrive/Desktop/aalacomp-main/src/route.jsx",
          lineNumber: 32,
          columnNumber: 27
        }, this) },
        { path: "/deal/:id", element: /* @__PURE__ */ jsxDEV(DealDetail, {}, void 0, false, {
          fileName: "C:/Users/MicroZaib/OneDrive/Desktop/aalacomp-main/src/route.jsx",
          lineNumber: 33,
          columnNumber: 33
        }, this) },
        { path: "products", element: /* @__PURE__ */ jsxDEV(Products, {}, void 0, false, {
          fileName: "C:/Users/MicroZaib/OneDrive/Desktop/aalacomp-main/src/route.jsx",
          lineNumber: 34,
          columnNumber: 32
        }, this) },
        { path: "products/:id", element: /* @__PURE__ */ jsxDEV(ProductDetail, {}, void 0, false, {
          fileName: "C:/Users/MicroZaib/OneDrive/Desktop/aalacomp-main/src/route.jsx",
          lineNumber: 35,
          columnNumber: 36
        }, this) },
        { path: "deal", element: /* @__PURE__ */ jsxDEV(Deal, {}, void 0, false, {
          fileName: "C:/Users/MicroZaib/OneDrive/Desktop/aalacomp-main/src/route.jsx",
          lineNumber: 36,
          columnNumber: 28
        }, this) },
        { path: "contact", element: /* @__PURE__ */ jsxDEV(About, {}, void 0, false, {
          fileName: "C:/Users/MicroZaib/OneDrive/Desktop/aalacomp-main/src/route.jsx",
          lineNumber: 37,
          columnNumber: 31
        }, this) },
        { path: "cart", element: /* @__PURE__ */ jsxDEV(Cart, {}, void 0, false, {
          fileName: "C:/Users/MicroZaib/OneDrive/Desktop/aalacomp-main/src/route.jsx",
          lineNumber: 38,
          columnNumber: 28
        }, this) },
        { path: "profile", element: /* @__PURE__ */ jsxDEV(Profile, {}, void 0, false, {
          fileName: "C:/Users/MicroZaib/OneDrive/Desktop/aalacomp-main/src/route.jsx",
          lineNumber: 39,
          columnNumber: 31
        }, this) },
        { path: "auth", element: /* @__PURE__ */ jsxDEV(AuthPage, {}, void 0, false, {
          fileName: "C:/Users/MicroZaib/OneDrive/Desktop/aalacomp-main/src/route.jsx",
          lineNumber: 40,
          columnNumber: 28
        }, this) },
        { path: "checkout", element: /* @__PURE__ */ jsxDEV(Checkout, {}, void 0, false, {
          fileName: "C:/Users/MicroZaib/OneDrive/Desktop/aalacomp-main/src/route.jsx",
          lineNumber: 41,
          columnNumber: 32
        }, this) }
      ]
    }
  ]
);
export const RouterRoot = () => /* @__PURE__ */ jsxDEV(RouterProvider, { router }, void 0, false, {
  fileName: "C:/Users/MicroZaib/OneDrive/Desktop/aalacomp-main/src/route.jsx",
  lineNumber: 46,
  columnNumber: 33
}, this);
_c2 = RouterRoot;
export default RouterRoot;
var _c, _c2;
$RefreshReg$(_c, "Layout");
$RefreshReg$(_c2, "RouterRoot");
import * as RefreshRuntime from "/@react-refresh";
const inWebWorker = typeof WorkerGlobalScope !== "undefined" && self instanceof WorkerGlobalScope;
if (import.meta.hot && !inWebWorker) {
  if (!window.$RefreshReg$) {
    throw new Error(
      "@vitejs/plugin-react can't detect preamble. Something is wrong."
    );
  }
  RefreshRuntime.__hmr_import(import.meta.url).then((currentExports) => {
    RefreshRuntime.registerExportsForReactRefresh("C:/Users/MicroZaib/OneDrive/Desktop/aalacomp-main/src/route.jsx", currentExports);
    import.meta.hot.accept((nextExports) => {
      if (!nextExports) return;
      const invalidateMessage = RefreshRuntime.validateRefreshBoundaryAndEnqueueUpdate("C:/Users/MicroZaib/OneDrive/Desktop/aalacomp-main/src/route.jsx", currentExports, nextExports);
      if (invalidateMessage) import.meta.hot.invalidate(invalidateMessage);
    });
  });
}
function $RefreshReg$(type, id) {
  return RefreshRuntime.register(type, "C:/Users/MicroZaib/OneDrive/Desktop/aalacomp-main/src/route.jsx " + id);
}
function $RefreshSig$() {
  return RefreshRuntime.createSignatureFunctionForTransform();
}

//# sourceMappingURL=data:application/json;base64,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QUFBO0FBQUFRLGFBQUFELEtBQUEiLCJuYW1lcyI6WyJSZWFjdCIsImNyZWF0ZUJyb3dzZXJSb3V0ZXIiLCJSb3V0ZXJQcm92aWRlciIsIk91dGxldCIsIkxpbmsiLCJIb21lIiwiUHJvZHVjdHMiLCJQcm9kdWN0RGV0YWlsIiwiRGVhbCIsIkFib3V0IiwiQ2FydCIsIlByb2ZpbGUiLCJBdXRoUGFnZSIsIkNoZWNrb3V0IiwiRGVhbERldGFpbCIsIkxheW91dCIsIl9jIiwicm91dGVyIiwicGF0aCIsImVsZW1lbnQiLCJjaGlsZHJlbiIsImluZGV4IiwiUm91dGVyUm9vdCIsIl9jMiIsIiRSZWZyZXNoUmVnJCJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlcyI6WyJyb3V0ZS5qc3giXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHsgY3JlYXRlQnJvd3NlclJvdXRlciwgUm91dGVyUHJvdmlkZXIsIE91dGxldCwgTGluayB9IGZyb20gJ3JlYWN0LXJvdXRlci1kb20nXG5pbXBvcnQgSG9tZSBmcm9tICcuL3BhZ2VzL0hvbWUnXG5pbXBvcnQgUHJvZHVjdHMgZnJvbSAnLi9wYWdlcy9wcm9kdWN0cydcbmltcG9ydCBQcm9kdWN0RGV0YWlsIGZyb20gJy4vcGFnZXMvUHJvZHVjdERldGFpbCdcbmltcG9ydCBEZWFsIGZyb20gJy4vcGFnZXMvRGVhbCdcbmltcG9ydCBBYm91dCBmcm9tICcuL0Fib3V0J1xuaW1wb3J0IENhcnQgZnJvbSAnLi9jYXJ0J1xuaW1wb3J0IFByb2ZpbGUgZnJvbSAnLi9wYWdlcy9Qcm9maWxlJ1xuaW1wb3J0IEF1dGhQYWdlIGZyb20gJy4uL3B1YmxpYy9sb3JlZydcbmltcG9ydCBDaGVja291dCBmcm9tICcuL3BhZ2VzL0NoZWNrb3V0J1xuaW1wb3J0IERlYWxEZXRhaWwgZnJvbSAnLi9wYWdlcy9EZWFsZGV0YWlsJ1xuY29uc3QgTGF5b3V0ID0gKCkgPT4gKFxuICA8ZGl2PlxuICAgIDxuYXYgY2xhc3NOYW1lPVwicC00IGJvcmRlci1iXCI+XG4gICAgICA8TGluayB0bz1cIi9cIiBjbGFzc05hbWU9XCJtci00XCI+SG9tZTwvTGluaz5cbiAgICAgIDxMaW5rIHRvPVwiL3Byb2R1Y3RzXCIgY2xhc3NOYW1lPVwibXItNFwiPlByb2R1Y3RzPC9MaW5rPlxuICAgICAgPExpbmsgdG89XCIvZGVhbFwiIGNsYXNzTmFtZT1cIm1yLTRcIj5EZWFsPC9MaW5rPlxuICAgICAgPExpbmsgdG89XCIvY29udGFjdFwiPkFib3V0PC9MaW5rPlxuICAgIDwvbmF2PlxuICAgIDxtYWluPlxuICAgICAgPE91dGxldCAvPlxuICAgIDwvbWFpbj5cbiAgPC9kaXY+XG4pXG5cbmV4cG9ydCBjb25zdCByb3V0ZXIgPSBjcmVhdGVCcm93c2VyUm91dGVyKFtcbiAge1xuICAgIHBhdGg6ICcvJyxcbiAgICBlbGVtZW50OiA8TGF5b3V0IC8+LFxuICAgIGNoaWxkcmVuOiBbXG4gICAgICB7IGluZGV4OiB0cnVlLCBlbGVtZW50OiA8SG9tZSAvPiB9LFxuICAgICAgeyBwYXRoOlwiL2RlYWwvOmlkXCIgLGVsZW1lbnQ6PERlYWxEZXRhaWwgLz4gfSxcbiAgICAgIHsgcGF0aDogJ3Byb2R1Y3RzJywgZWxlbWVudDogPFByb2R1Y3RzIC8+IH0sXG4gICAgICB7IHBhdGg6ICdwcm9kdWN0cy86aWQnLCBlbGVtZW50OiA8UHJvZHVjdERldGFpbCAvPiB9LFxuICAgICAgeyBwYXRoOiAnZGVhbCcsIGVsZW1lbnQ6IDxEZWFsIC8+IH0sXG4gICAgICB7IHBhdGg6ICdjb250YWN0JywgZWxlbWVudDogPEFib3V0IC8+IH0sXG4gICAgICB7IHBhdGg6ICdjYXJ0JywgZWxlbWVudDogPENhcnQgLz4gfSxcbiAgICAgIHsgcGF0aDogJ3Byb2ZpbGUnLCBlbGVtZW50OiA8UHJvZmlsZSAvPiB9LFxuICAgICAgeyBwYXRoOiAnYXV0aCcsIGVsZW1lbnQ6IDxBdXRoUGFnZSAvPiB9LFxuICAgICAgeyBwYXRoOiAnY2hlY2tvdXQnLCBlbGVtZW50OiA8Q2hlY2tvdXQgLz4gfVxuICAgIF0sXG4gIH0sXG5dKVxuXG5leHBvcnQgY29uc3QgUm91dGVyUm9vdCA9ICgpID0+IDxSb3V0ZXJQcm92aWRlciByb3V0ZXI9e3JvdXRlcn0gLz5cblxuZXhwb3J0IGRlZmF1bHQgUm91dGVyUm9vdCJdLCJmaWxlIjoiQzovVXNlcnMvTWljcm9aYWliL09uZURyaXZlL0Rlc2t0b3AvYWFsYWNvbXAtbWFpbi9zcmMvcm91dGUuanN4In0=
