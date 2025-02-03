import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface PortalProps {
  children: React.ReactNode;
  selector?: string;
}

const Portal: React.FC<PortalProps> = ({
  children,
  selector = "#portal-root",
}) => {
  const [mounted, setMounted] = useState(false);
  const [portalElement, setPortalElement] = useState<Element | null>(null);

  useEffect(() => {
    setMounted(true);

    return () => setMounted(false);
  }, []);

  useEffect(() => {
    const element = document.querySelector(selector);
    setPortalElement(element);
  }, [selector]);

  return mounted && portalElement
    ? createPortal(children, portalElement)
    : null;
};

export default Portal;
