import React, { forwardRef } from "react";
import { cn } from "../../lib/utils";


export const Table = forwardRef((props, ref) => {
  const { className, ...otherProps } = props;
  return (
    <div className="w-full overflow-auto">
      <table
        ref={ref}
        className={cn("w-full caption-bottom text-sm", className)}
        {...otherProps}
      />
    </div>
  );
});
Table.displayName = "Table";

export const TableHeader = forwardRef((props, ref) => {
  const { className, ...otherProps } = props;
  return (
    <thead ref={ref} className={cn("[&_tr]:border-b", className)} {...otherProps} />
  );
});
TableHeader.displayName = "TableHeader";

export const TableBody = forwardRef((props, ref) => {
  const { className, ...otherProps } = props;
  return (
    <tbody
      ref={ref}
      className={cn("[&_tr:last-child]:border-0", className)}
      {...otherProps}
    />
  );
});
TableBody.displayName = "TableBody";

export const TableFooter = forwardRef((props, ref) => {
  const { className, ...otherProps } = props;
  return (
    <tfoot
      ref={ref}
      className={cn("bg-primary font-medium text-primary-foreground", className)}
      {...otherProps}
    />
  );
});
TableFooter.displayName = "TableFooter";

export const TableRow = forwardRef((props, ref) => {
  const { className, ...otherProps } = props;
  return (
    <tr
      ref={ref}
      className={cn(
        "border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
        className
      )}
      {...otherProps}
    />
  );
});
TableRow.displayName = "TableRow";

export const TableHead = forwardRef((props, ref) => {
  const { className, ...otherProps } = props;
  return (
    <th
      ref={ref}
      className={cn(
        "h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0",
        className
      )}
      {...otherProps}
    />
  );
});
TableHead.displayName = "TableHead";

export const TableCell = forwardRef((props, ref) => {
  const { className, ...otherProps } = props;
  return (
    <td
      ref={ref}
      className={cn("p-4 align-middle [&:has([role=checkbox])]:pr-0", className)}
      {...otherProps}
    />
  );
});
TableCell.displayName = "TableCell";

export const TableCaption = forwardRef((props, ref) => {
  const { className, ...otherProps } = props;
  return (
    <caption
      ref={ref}
      className={cn("mt-4 text-sm text-muted-foreground", className)}
      {...otherProps}
    />
  );
});
TableCaption.displayName = "TableCaption";
