import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList,BreadcrumbSeparator } from "@/components/ui/breadcrumb";

type PageLinksProps = {
    id:string;
    moduleName:string;
    
}
export default function PageLinks({id,moduleName}:PageLinksProps) {
  return (
    <div>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href={`/module/${id}`} className="text-sm ml-32">{moduleName}</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator className="-ml-1 -mr-2"/>
          <BreadcrumbItem>
            {/* <BreadcrumbPage>{name}</BreadcrumbPage> */}
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
}