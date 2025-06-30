// Sidebar.jsx
import React, {
    createContext,
    useContext,
    useState,
    useEffect,
    useCallback,
    useMemo
  } from "react";
  import {
    Button,
    Offcanvas,
    InputGroup,
    Form,
    Accordion,
    OverlayTrigger,
    Tooltip as BSTooltip
  } from "react-bootstrap";
  import { PanelLeft, GripVertical } from "react-bootstrap-icons";
  
  /** Context and provider **/
  const SidebarContext = createContext();
  export function useSidebar() {
    const c = useContext(SidebarContext);
    if (!c) throw Error("useSidebar must be within SidebarProvider");
    return c;
  }
  export function SidebarProvider({
    defaultOpen = true,
    open: openProp,
    onOpenChange,
    children
  }) {
    const [mobile, setMobile] = useState(window.innerWidth < 768);
    const [open, _setOpen] = useState(defaultOpen);
    const isControlled = openProp !== undefined;
    const effectiveOpen = isControlled ? openProp : open;
    const setOpen = useCallback(
      v => {
        const nv = typeof v === "function" ? v(effectiveOpen) : v;
        if (onOpenChange) onOpenChange(nv);
        else _setOpen(nv);
      },
      [effectiveOpen, onOpenChange]
    );
  
    const toggle = useCallback(
      () => (mobile ? toggleMobile() : setOpen(o => !o)),
      [mobile, setOpen]
    );
    const [openMobile, setOpenMobile] = useState(false);
    const toggleMobile = () => setOpenMobile(o => !o);
  
    useEffect(() => {
      const onRes = () => setMobile(window.innerWidth < 768);
      window.addEventListener("resize", onRes);
      return () => window.removeEventListener("resize", onRes);
    }, []);
  
    useEffect(() => {
      const onKey = e => {
        if ((e.ctrlKey || e.metaKey) && e.key === "b") {
          e.preventDefault();
          toggle();
        }
      };
      window.addEventListener("keydown", onKey);
      return () => window.removeEventListener("keydown", onKey);
    }, [toggle]);
  
    const state = effectiveOpen ? "expanded" : "collapsed";
  
    const ctx = useMemo(
      () => ({
        mobile,
        open: effectiveOpen,
        openMobile,
        setOpenMobile,
        toggle,
        state
      }),
      [mobile, effectiveOpen, openMobile, toggle, state]
    );
  
    return (
      <SidebarContext.Provider value={ctx}>
        {children}
      </SidebarContext.Provider>
    );
  }
  
  /** Main Sidebar **/
  export function Sidebar({ side = "left", variant = "sidebar", children }) {
    const { mobile, open, openMobile, setOpenMobile } = useSidebar();
    const width = "16rem";
    const iconWidth = "3rem";
  
    if (mobile) {
      return (
        <Offcanvas
          show={openMobile}
          onHide={() => setOpenMobile(false)}
          placement={side}
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Sidebar</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>{children}</Offcanvas.Body>
        </Offcanvas>
      );
    }
  
    const containerStyle = {
      position: "fixed",
      top: 0,
      bottom: 0,
      width: open ? width : iconWidth,
      transition: "width 0.2s ease",
      borderRight: side === "left" ? "1px solid #dee2e6" : undefined,
      borderLeft: side === "right" ? "1px solid #dee2e6" : undefined,
      background: "#fff",
      zIndex: 1030
    };
  
    return (
      <div style={containerStyle} data-state={open ? "expanded" : "collapsed"}>
        {children}
      </div>
    );
  }
  
  /** Trigger **/
  export function SidebarTrigger(props) {
    const { toggle } = useSidebar();
    return (
      <Button
        variant="light"
        onClick={toggle}
        style={{ width: "2.5rem", height: "2.5rem" }}
        {...props}
      >
        <PanelLeft />
        <span className="visually-hidden">Toggle Sidebar</span>
      </Button>
    );
  }
  
  /** Rail **/
  export function SidebarRail() {
    const { toggle } = useSidebar();
    return (
      <div
        onClick={toggle}
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          width: "4px",
          right: "-2px",
          cursor: "col-resize",
          background: "transparent"
        }}
      />
    );
  }
  
  /** Inset container **/
  export function SidebarInset({ children }) {
    return <main style={{ marginLeft: "16rem", transition: "margin 0.2s ease" }}>{children}</main>;
  }
  
  /** Header & Footer **/
  export const SidebarHeader = ({ children }) => <div className="p-2">{children}</div>;
  export const SidebarFooter = ({ children }) => <div className="p-2 mt-auto">{children}</div>;
  
  /** Input **/
  export function SidebarInput(props) {
    return (
      <Form.Control
        size="sm"
        placeholder="Search..."
        className="mb-2"
        {...props}
      />
    );
  }
  
  /** Separator **/
  export const SidebarSeparator = () => (
    <hr style={{ margin: "0.5rem 0", borderColor: "#dee2e6" }} />
  );
  
  /** Content container **/
  export const SidebarContent = ({ children }) => (
    <div style={{ overflowY: "auto", flex: 1 }}>{children}</div>
  );
  
  /** Menu Items **/
  export function SidebarMenu({ id = "menu", children, defaultActiveKey }) {
    return (
      <Accordion as="ul" defaultActiveKey={defaultActiveKey}>
        {children}
      </Accordion>
    );
  }
  export function SidebarMenuItem({ children }) {
    return <li className="mb-1">{children}</li>;
  }
  
  export function SidebarMenuButton({
    eventKey,
    isActive,
    tooltip,
    children
  }) {
    const { state, mobile } = useSidebar();
  
    const btn = (
      <Accordion.Header
        as="button"
        eventKey={eventKey}
        style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
      >
        {children}
      </Accordion.Header>
    );
  
    if (tooltip && state === "collapsed" && !mobile) {
      return (
        <OverlayTrigger overlay={<BSTooltip>{tooltip}</BSTooltip>} placement="right">
          {btn}
        </OverlayTrigger>
      );
    }
    return btn;
  }
  export const SidebarMenuAction = ({ children, ...props }) => (
    <Button variant="link" size="sm" {...props}>{children}</Button>
  );
  
  export const SidebarMenuBadge = ({ children }) => (
    <span className="badge bg-secondary ms-auto">{children}</span>
  );
  
  /** Submenu **/
  export function SidebarMenuSub({ eventKey, children }) {
    return (
      <Accordion.Collapse eventKey={eventKey}>
        <ul className="ps-3 mb-1">{children}</ul>
      </Accordion.Collapse>
    );
  }
  export const SidebarMenuSubItem = ({ children }) => <li>{children}</li>;
  export const SidebarMenuSubButton = ({ children, href }) => (
    <a href={href} className="d-block py-1 text-decoration-none">{children}</a>
  );
  
  /** Skeleton loader **/
  export function SidebarMenuSkeleton({ showIcon = false }) {
    return (
      <div className="d-flex align-items-center mb-2">
        {showIcon && <div className="placeholder-glow me-2" style={{ width: "1rem", height: "1rem", borderRadius: "0.375rem" }} />}
        <div className="placeholder-glow flex-grow-1" style={{ height: "1rem", maxWidth: "80%" }} />
      </div>
    );
  }
  