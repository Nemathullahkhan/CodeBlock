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
          <BreadcrumbLink href={"/home"} className="text-sm ml-16">Home</BreadcrumbLink>
          <BreadcrumbSeparator className="-ml-1 -mr-2"/>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink href={`/module/${id}`} className="text-sm ">{moduleName}</BreadcrumbLink>
          </BreadcrumbItem>
          
         
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
}