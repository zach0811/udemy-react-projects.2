import { useAccordionItemContext } from "./AccordionItem";
import { useAccordionContext } from "./Accordion";

export const AccordionTitle = ({ className, children }) => {
  const { toggleItem } = useAccordionContext();
  const id = useAccordionItemContext();
  return (
    <h3 className={className} onClick={() => toggleItem(id)}>
      {children}
    </h3>
  );
};
