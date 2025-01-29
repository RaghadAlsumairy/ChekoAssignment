import { useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";
import leaflet from "leaflet";
import { Branch } from "../../models/Branch";
import "./MapComponent.css";
import { defaultMarker, selectedMarker } from "../../config/markerConfig";

interface Props {
  filterBranches: Branch[];
}
const MapComponent: React.FC<Props> = ({ filterBranches }: Props) => {
  const mapContainer = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (mapContainer.current) {
      const map = leaflet.map(mapContainer.current).setView([24.713, 46.67], 5);

      leaflet
        .tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        })
        .addTo(map);

      filterBranches.forEach((branch) => {
        const marker = leaflet
          .marker([branch.latitude, branch.longitude], { icon: defaultMarker })
          .addTo(map)
          .bindTooltip(branchInfo(branch), {
            permanent: false,
            direction: "top",
            className: "Ctooltip",
            interactive: true,
          });

        marker.on("mouseover", function () {
          marker.setIcon(selectedMarker);
        });
        marker.on("mouseout", function () {
          marker.setIcon(defaultMarker);
        });
      });

      map.on("tooltipopen", () => {
        const homeButton = document.getElementById("goToHomeBtn");
        if (homeButton) {
          homeButton.addEventListener("click", () => {
            window.location.href = "/";
          });
        }
      });

      return () => {
        map.remove();
      };
    }
  }, [filterBranches]);

  const branchInfo = (branch: Branch) => {
    return `
        <div class='row p-2'>
            <div class='col-3'>
                <img src="/images/logo.jpg" alt="${branch.name}" class="rounded tooltip-img" />
            </div>
            <div class='col-9'>
            <div class='row mb-5'>
               <strong>${branch.name}</strong>
               </div>
               <div class=' row justify-content-center' >
               <div class='col' >               
                menu list
                  </div>
                  <div class='col' >    
                  <button class="btn button" id="goToHomeBtn">
                         >   
                    </button>
                  </div>
             
               </div>
             
                
            </div>
        </div>`;
  };

  return <div id="map" ref={mapContainer}></div>;
};
export default MapComponent;
