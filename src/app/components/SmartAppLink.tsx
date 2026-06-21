"use client";

import type { ComponentPropsWithoutRef, ReactNode } from "react";
import {
  appStoreAriaLabel,
  appStoreLinkProps,
  useAppStoreDestination,
} from "../hooks/useAppStoreUrl";

type SmartAppLinkProps = Omit<ComponentPropsWithoutRef<"a">, "href"> & {
  children: ReactNode;
  /** Passed to aria-label helper, e.g. "Monthly subscription". */
  context?: string;
};

export default function SmartAppLink({
  children,
  context = "download",
  "aria-label": ariaLabelProp,
  ...rest
}: SmartAppLinkProps) {
  const destination = useAppStoreDestination();

  return (
    <a
      href={destination.href}
      aria-label={ariaLabelProp ?? appStoreAriaLabel(destination, context)}
      {...appStoreLinkProps(destination)}
      {...rest}
    >
      {children}
    </a>
  );
}
