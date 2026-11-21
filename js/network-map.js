/**
 * WhiteStores Interactive 3D / Isometric India Network Map
 * Renders complete official India map with state boundaries,
 * handles city selection (Mumbai & Thane, Bengaluru, Delhi) with
 * stable unique IDs, verified locality data, zoomable & pan-able map canvas,
 * clickable store location markers, and compact verified nodes panel.
 */
(function () {
  'use strict';

  var STORE_IMAGES = {
    // Mumbai (Verified Operational Hubs)
    '01': 'assets/stitch-exports/professional_documentary_photograph_of_organized_commercial_food_cold_storage.png', // Dahisar
    '02': 'assets/stitch-exports/documentary_editorial_photograph_of_a_commercial_freezer_cold_storage_facility.png', // Vakola
    '03': 'assets/stitch-exports/professional_wide_photograph_of_food_cold_storage_warehouse_with_commercial.png', // Santacruz
    '04': 'assets/images/chembur-facility.png', // Chembur (Actual WhiteStores Chembur facility photograph!)
    '05': 'assets/stitch-exports/professional_food_commerce_warehouse_operations_a_focused_warehouse_worker_in.png', // Oshiwara
    '06': 'assets/stitch-exports/professional_documentary_style_photo_of_a_cold_storage_and_industrial_warehouse.png', // Hiranandani Estate
    '07': 'assets/stitch-exports/editorial_documentary_wide_photograph_of_a_modern_commercial_food_storage_and.png', // Khopat
    '08': 'assets/stitch-exports/documentary_editorial_photograph_of_food_commerce_infrastructure_operations.png', // Fort
    '09': 'assets/stitch-exports/documentary_photograph_of_a_modern_commercial_kitchen_professional_chefs_in.png', // Versova

    // Bengaluru (Planned Hubs)
    'b01': 'assets/stitch-exports/professional_documentary_photograph_of_organized_commercial_food_cold_storage.png',
    'b02': 'assets/stitch-exports/documentary_editorial_photograph_of_a_commercial_freezer_cold_storage_facility.png',
    'b03': 'assets/stitch-exports/professional_wide_photograph_of_food_cold_storage_warehouse_with_commercial.png',
    'b04': 'assets/stitch-exports/professional_food_commerce_warehouse_operations_a_focused_warehouse_worker_in.png',

    // Fallbacks
    'delhi': 'assets/stitch-exports/professional_wide_photograph_of_food_cold_storage_warehouse_with_commercial.png',
    'default': 'assets/stitch-exports/professional_documentary_photograph_of_organized_commercial_food_cold_storage.png'
  };

  var NETWORK_DATA = {
    mumbai: {
      id: 'mumbai',
      cityName: 'Mumbai & Thane',
      statusBadge: 'Active Cluster',
      badgeClass: 'bg-[#A6F134]/25 text-[#013125] border-[#A6F134]/40',
      nodesCount: '9 Verified Hubs',
      headerTitle: 'Verified Nodes',
      footerPrompt: 'Select location to view catchment',
      footerText: '9 Verified Nodes',
      footerLiveDot: true,
      pinId: 'ws-pin-mumbai',
      stateSlug: 'maharashtra',
      activeRoutes: ['ws-route-mumbai-bangalore', 'ws-route-mumbai-delhi'],
      baseCoord: { x: 148.8, y: 318.8 },
      isUpcoming: false,
      locations: [
        { id: '01', name: 'Dahisar', region: 'Western Suburbs (North)', type: 'Cold Fulfilment Node', status: 'Active Node', catchment: '15-Min Quick Commerce & Aggregators', temp: '-18°C Stable', offset: { dx: -8, dy: -18 } },
        { id: '02', name: 'Vakola', region: 'Santacruz East / Airport Hub', type: 'Micro-Fulfilment Node', status: 'Active Node', catchment: 'Central & Western Commuter Belt', temp: '-18°C / +4°C Dual', offset: { dx: 6, dy: 6 } },
        { id: '03', name: 'Santacruz', region: 'Western Suburbs', type: 'Cold Storage & Dispatch', status: 'Active Node', catchment: 'Bandra-Juhu High Consumption Pockets', temp: '-18°C Stable', offset: { dx: -12, dy: 4 } },
        { id: '04', name: 'Chembur', region: 'Eastern Suburbs Corridor', type: 'Central Transit Node', status: 'Active Node', catchment: 'Freeway & Navi Mumbai Corridor', temp: '-18°C Stable', offset: { dx: 14, dy: 10 } },
        { id: '05', name: 'Oshiwara', region: 'Andheri West', type: 'Dark Store Dispatch Hub', status: 'Active Node', catchment: 'Lokhandwala & Link Road High Demand', temp: '-18°C Stable', offset: { dx: -14, dy: -6 } },
        { id: '06', name: 'Hiranandani Estate', region: 'Thane West (Ghodbunder)', type: 'Premium Cluster Node', status: 'Active Node', catchment: 'Thane High-Density Residential Nodes', temp: '-18°C Stable', offset: { dx: 18, dy: -20 } },
        { id: '07', name: 'Khopat (Thane West)', region: 'Central Thane', type: 'Omnichannel Hub', status: 'Active Node', catchment: 'Thane Central & Mulund Catchment', temp: '-18°C Stable', offset: { dx: 16, dy: -8 } },
        { id: '08', name: 'Fort', region: 'South Mumbai (CBD)', type: 'Commercial Dispatch Node', status: 'Active Node', catchment: 'South Mumbai Corporate & Premium D2C', temp: '-18°C Stable', offset: { dx: -4, dy: 22 } },
        { id: '09', name: 'Versova', region: 'Western Coastal Hub', type: 'Quick Kitchen & Storage', status: 'Active Node', catchment: 'Versova & Juhu High Density Zone', temp: '-18°C Stable', offset: { dx: -20, dy: -2 } }
      ]
    },
    bangalore: {
      id: 'bangalore',
      cityName: 'Bengaluru',
      statusBadge: 'Upcoming Cluster',
      badgeClass: 'bg-[#013125]/10 text-[#013125] border-[#013125]/20',
      nodesCount: 'Phase 2 Expansion',
      headerTitle: 'Planned Deployment Zones',
      footerPrompt: 'Strategic southern fulfillment corridors',
      footerText: 'Bengaluru Cluster • Launching Soon',
      footerLiveDot: false,
      pinId: 'ws-pin-bangalore',
      stateSlug: 'karnataka',
      activeRoutes: ['ws-route-mumbai-bangalore', 'ws-route-delhi-bangalore'],
      baseCoord: { x: 221.1, y: 416.3 },
      isUpcoming: true,
      locations: [
        { id: '01', name: 'Indiranagar', region: 'East Bengaluru Corridor', type: 'Planned Fulfilment Hub', status: 'Upcoming', catchment: 'CBD & Inner East High-Demand Pockets', temp: '-18°C Ready', offset: { dx: 10, dy: -8 } },
        { id: '02', name: 'Koramangala', region: 'South-East Corridor', type: 'Planned Fulfilment Hub', status: 'Upcoming', catchment: 'High-Density Consumer & Food Belt', temp: '-18°C Ready', offset: { dx: 6, dy: 8 } },
        { id: '03', name: 'HSR Layout', region: 'South Corridor', type: 'Planned Fulfilment Hub', status: 'Upcoming', catchment: 'Quick Commerce High Velocity Node', temp: '-18°C Ready', offset: { dx: 8, dy: 16 } },
        { id: '04', name: 'Whitefield', region: 'East Tech Corridor', type: 'Planned Fulfilment Hub', status: 'Upcoming', catchment: 'IT Corridor & Gated Residential Communities', temp: '-18°C Ready', offset: { dx: 20, dy: -4 } }
      ]
    },
    delhi: {
      id: 'delhi',
      cityName: 'Delhi',
      statusBadge: 'Upcoming Cluster',
      badgeClass: 'bg-[#013125]/10 text-[#013125] border-[#013125]/20',
      nodesCount: 'Network Expansion',
      headerTitle: 'Upcoming Expansion',
      footerPrompt: 'NCR distribution network in development',
      footerText: 'Delhi NCR • Expansion in Progress',
      footerLiveDot: false,
      pinId: 'ws-pin-delhi',
      stateSlug: 'delhi',
      activeRoutes: ['ws-route-mumbai-delhi', 'ws-route-delhi-bangalore'],
      baseCoord: { x: 215.2, y: 160.2 },
      isUpcoming: true,
      locations: [], // No fictional operational stores
      upcomingInfo: [
        {
          title: 'Strategic NCR Cold Hub',
          desc: 'Planned central cold-chain storage and cross-dock distribution facility serving Delhi, Gurugram and Noida.',
          badge: 'Phase 3 Corridor'
        },
        {
          title: 'Hyperlocal Dark Store Integration',
          desc: 'Engineered for 15-minute quick commerce delivery networks and high-velocity food brand logistics.',
          badge: 'Evaluation Phase'
        },
        {
          title: 'Dual-Zone Temperature Control',
          desc: 'Continuous -18°C frozen and +4°C chilled temperature integrity with real-time IoT monitoring.',
          badge: '-18°C / +4°C'
        }
      ]
    }
  };

  function initNetworkMap() {
    var sections = document.querySelectorAll('.ws-network-map-section');
    if (!sections.length) return;

    sections.forEach(function (container) {
      var currentCityId = 'mumbai';
      var activeLocationId = '01';
      var isDragSuppressed = false;

      // Query elements strictly within this section container
      var listEl = container.querySelector('.ws-map-location-list');
      var floatCard = container.querySelector('.ws-map-float-card');
      var cityPills = container.querySelectorAll('.ws-city-pill');
      var clusterBadge = container.querySelector('.ws-cluster-badge');
      var clusterCount = container.querySelector('.ws-cluster-count');
      var headerTitleEl = container.querySelector('.ws-cluster-header-title');
      var footerPromptEl = container.querySelector('.ws-cluster-prompt-text');
      var footerTextEl = container.querySelector('.ws-cluster-footer-text');
      var footerLiveDotEl = container.querySelector('.ws-cluster-live-dot');
      var subnodesLayer = container.querySelector('#ws-map-subnodes-layer');
      var statePaths = container.querySelectorAll('.ws-state-path');
      var mapPins = container.querySelectorAll('.ws-map-pin');
      var routeLines = container.querySelectorAll('.ws-route-line');
      var mapStage = container.querySelector('.ws-map-stage');
      var mapSvg = container.querySelector('.ws-map-svg');

      // Setup Close button on Active Node Card
      if (floatCard) {
        var closeBtn = floatCard.querySelector('.ws-float-card-close');
        if (closeBtn && !closeBtn._hasCloseListener) {
          closeBtn._hasCloseListener = true;
          closeBtn.addEventListener('click', function (e) {
            e.stopPropagation();
            floatCard.classList.add('is-dismissed');
            floatCard.style.display = 'none';
          });
        }
      }

      // Update the Floating Card on the Map
      function updateFloatCard(loc, cityKey) {
        if (!floatCard) return;
        var cityData = NETWORK_DATA[cityKey || currentCityId];
        var badgeEl = floatCard.querySelector('.ws-float-card-badge');
        var tempEl = floatCard.querySelector('.ws-float-card-temp');
        var titleEl = floatCard.querySelector('.ws-float-card-title');
        var regionEl = floatCard.querySelector('.ws-float-card-region');
        var catchmentEl = floatCard.querySelector('.ws-float-card-catchment');
        var typeEl = floatCard.querySelector('.ws-float-card-type');
        var statusTextEl = floatCard.querySelector('.ws-float-card-status-text');
        var statusWrapper = floatCard.querySelector('.ws-float-card-status-wrapper');
        var thumbEl = floatCard.querySelector('.ws-float-card-thumb');

        // Resolve thumbnail image
        if (thumbEl) {
          var imagePath = STORE_IMAGES['default'];
          if (cityData.id === 'delhi') {
            imagePath = STORE_IMAGES['delhi'];
          } else if (loc) {
            var lookupKey = (cityData.id === 'bangalore') ? ('b' + loc.id) : loc.id;
            imagePath = STORE_IMAGES[lookupKey] || STORE_IMAGES[loc.id] || STORE_IMAGES['default'];
          }
          thumbEl.src = imagePath;
          thumbEl.alt = (loc ? loc.name : cityData.cityName) + ' Facility';
        }

        if (cityData.id === 'delhi') {
          if (badgeEl) {
            badgeEl.textContent = 'UPCOMING CLUSTER';
            badgeEl.className = 'ws-float-card-badge text-[8.5px] font-extrabold uppercase tracking-wider text-[#013125] bg-[#013125]/10 px-2 py-0.5 rounded-full truncate';
          }
          if (tempEl) tempEl.textContent = '-18°C / +4°C';
          if (titleEl) titleEl.textContent = 'WHITE STORES / Delhi Hub ↗';
          if (regionEl) regionEl.textContent = 'National Capital Region (NCR)';
          if (catchmentEl) catchmentEl.textContent = 'Phase 3 Regional Cold Corridor';
          if (typeEl) typeEl.textContent = 'Planned Regional Cold Hub';
          if (statusTextEl) statusTextEl.textContent = 'Expansion Planned';
          if (statusWrapper) statusWrapper.className = 'ws-float-card-status-wrapper text-[#013125] font-bold flex items-center gap-1 flex-shrink-0';
        } else if (cityData.id === 'bangalore') {
          if (badgeEl) {
            badgeEl.textContent = 'UPCOMING CLUSTER';
            badgeEl.className = 'ws-float-card-badge text-[8.5px] font-extrabold uppercase tracking-wider text-[#013125] bg-[#013125]/10 px-2 py-0.5 rounded-full truncate';
          }
          if (tempEl) tempEl.textContent = loc ? loc.temp : '-18°C Ready';
          if (titleEl) titleEl.textContent = loc ? ('WHITE STORE / ' + loc.id + ' - ' + loc.name + ' ↗') : 'WHITE STORES / Bengaluru Hub ↗';
          if (regionEl) regionEl.textContent = loc ? (loc.region + ' (Karnataka)') : 'Southern Tech Corridor (Karnataka)';
          if (catchmentEl) catchmentEl.textContent = loc ? loc.catchment : 'CBD & Tech Corridor Catchment';
          if (typeEl) typeEl.textContent = loc ? loc.type : 'Planned Cold Fulfilment Facility';
          if (statusTextEl) statusTextEl.textContent = 'Expansion Planned';
          if (statusWrapper) statusWrapper.className = 'ws-float-card-status-wrapper text-[#013125] font-bold flex items-center gap-1 flex-shrink-0';
        } else {
          // Mumbai (Active)
          if (badgeEl) {
            badgeEl.textContent = 'ACTIVE NODE';
            badgeEl.className = 'ws-float-card-badge text-[8.5px] font-extrabold uppercase tracking-wider text-[#013125] bg-[#A6F134]/30 px-2 py-0.5 rounded-full truncate';
          }
          if (loc) {
            if (tempEl) tempEl.textContent = loc.temp;
            if (titleEl) titleEl.textContent = 'WHITE STORE / ' + loc.id + ' - ' + loc.name + ' ↗';
            if (regionEl) regionEl.textContent = loc.region + ' (Mumbai & Thane)';
            if (catchmentEl) catchmentEl.textContent = loc.catchment;
            if (typeEl) typeEl.textContent = loc.type;
          }
          if (statusTextEl) statusTextEl.textContent = 'Live Synced';
          if (statusWrapper) statusWrapper.className = 'ws-float-card-status-wrapper text-[#82D616] font-bold flex items-center gap-1 flex-shrink-0';
        }

        // Keep card visible on location updates
        floatCard.classList.remove('is-dismissed');
        floatCard.style.display = '';
      }

      // Render Subnode markers cleanly inside SVG
      function updateSubnodes(cityKey) {
        if (!subnodesLayer) return;
        var cityData = NETWORK_DATA[cityKey];
        if (!cityData.locations || cityData.locations.length === 0) {
          subnodesLayer.innerHTML = '';
          return;
        }

        var svgHtml = '';
        cityData.locations.forEach(function (loc) {
          var sx = cityData.baseCoord.x + loc.offset.dx;
          var sy = cityData.baseCoord.y + loc.offset.dy;
          var isActive = loc.id === activeLocationId;
          var pillFill = isActive ? '#013125' : '#FFFFFF';
          var pillStroke = isActive ? '#A6F134' : '#013125';
          var strokeWidth = isActive ? '2' : '1.3';
          var textColor = isActive ? '#FFFFFF' : '#013125';
          var dotColor = '#A6F134';

          var pulseRing = isActive ? '<circle class="ws-subnode-pulse" cx="0" cy="0" r="14" fill="none" stroke="#A6F134" stroke-width="2"/>' : '';

          svgHtml += '<g class="ws-subnode-marker ' + (isActive ? 'is-active' : '') + '" data-id="' + loc.id + '" transform="translate(' + sx + ', ' + sy + ')" role="button" tabindex="0" aria-label="' + loc.name + '">';
          svgHtml += '  <circle class="ws-subnode-hit" cx="0" cy="0" r="18" fill="rgba(0,0,0,0.001)" pointer-events="all"/>';
          svgHtml += pulseRing;
          svgHtml += '  <g class="ws-marker-badge" filter="drop-shadow(0 2px 4px rgba(1,49,37,0.28))">';
          svgHtml += '    <rect x="-14" y="-8" width="28" height="16" rx="8" fill="' + pillFill + '" stroke="' + pillStroke + '" stroke-width="' + strokeWidth + '"/>';
          svgHtml += '    <circle cx="-6" cy="0" r="2.8" fill="' + dotColor + '"/>';
          svgHtml += '    <text x="4.5" y="0.5" text-anchor="middle" dominant-baseline="central" font-family="Manrope, sans-serif" font-size="8.5" font-weight="800" fill="' + textColor + '" letter-spacing="0.02em">' + loc.id + '</text>';
          svgHtml += '  </g>';
          svgHtml += '  <title>' + loc.id + ' - ' + loc.name + ' (' + loc.region + ')</title>';
          svgHtml += '</g>';
        });
        subnodesLayer.innerHTML = svgHtml;

        // Attach listeners to subnodes
        var subnodeEls = subnodesLayer.querySelectorAll('.ws-subnode-marker');
        subnodeEls.forEach(function (marker) {
          marker.addEventListener('click', function (e) {
            if (isDragSuppressed) return;
            e.stopPropagation();
            var id = marker.getAttribute('data-id');
            setActiveLocation(id);
          });
          marker.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              var id = marker.getAttribute('data-id');
              setActiveLocation(id);
            }
          });
        });
      }

      // Set Active Locality inside currently selected city
      function setActiveLocation(id) {
        var cityData = NETWORK_DATA[currentCityId];
        if (!cityData.locations || cityData.locations.length === 0) return;

        activeLocationId = id;
        var loc = cityData.locations.find(function (item) { return item.id === id; });
        if (!loc && cityData.locations.length > 0) {
          loc = cityData.locations[0];
          activeLocationId = loc.id;
        }

        // 1. Update List UI cleanly
        if (listEl) {
          var items = listEl.querySelectorAll('.ws-loc-item');
          items.forEach(function (item) {
            if (item.getAttribute('data-id') === activeLocationId) {
              item.classList.add('is-active');
              item.setAttribute('aria-selected', 'true');
            } else {
              item.classList.remove('is-active');
              item.setAttribute('aria-selected', 'false');
            }
          });
        }

        // 2. Update Subnode markers UI in SVG
        if (subnodesLayer) {
          updateSubnodes(currentCityId);
        }

        // 3. Update Floating Card
        if (loc) {
          updateFloatCard(loc, currentCityId);
        }
      }

      // Render the right-side information panel based on selected city
      function renderPanel(cityKey) {
        if (!listEl) return;
        var cityData = NETWORK_DATA[cityKey];

        if (cityData.id === 'delhi') {
          // Delhi: Render clean upcoming expansion cards (no fictional stores)
          var html = '<div class="space-y-1.5 py-0.5">';
          cityData.upcomingInfo.forEach(function (info) {
            html += '<div class="p-2.5 rounded-lg bg-[#F8FAF7] border border-[#E9ECE8] transition-all hover:border-[#A6F134]/60 hover:bg-[#F2F7F3]">';
            html += '  <div class="flex items-center justify-between gap-1.5 mb-0.5">';
            html += '    <span class="text-[11.5px] font-bold text-[#013125] leading-snug">' + info.title + '</span>';
            html += '    <span class="text-[9px] font-bold text-[#013125] bg-[#A6F134]/25 px-1.5 py-0.5 rounded-full flex-shrink-0">' + info.badge + '</span>';
            html += '  </div>';
            html += '  <p class="text-[10px] text-[#55605B] leading-relaxed">' + info.desc + '</p>';
            html += '</div>';
          });
          html += '</div>';
          listEl.innerHTML = html;
        } else {
          // Mumbai or Bengaluru: Render locations list
          var listHtml = '';
          cityData.locations.forEach(function (loc) {
            var isActive = loc.id === activeLocationId;
            var numBg = cityData.isUpcoming ? 'bg-[#EBF1EC] text-[#013125]' : (isActive ? 'bg-[#A6F134] text-[#013125]' : 'bg-[#F0F4F0] text-[#69736D]');
            listHtml += '<li class="ws-loc-item ' + (isActive ? 'is-active' : '') + '" data-id="' + loc.id + '" role="option" aria-selected="' + (isActive ? 'true' : 'false') + '" tabindex="0">';
            listHtml += '  <div class="flex items-center gap-2 min-w-0">';
            listHtml += '    <span class="ws-loc-number w-5 h-5 rounded flex items-center justify-center text-[9.5px] font-bold ' + numBg + ' flex-shrink-0 transition-colors">' + loc.id + '</span>';
            listHtml += '    <div class="flex flex-col min-w-0">';
            listHtml += '      <span class="ws-loc-name text-xs font-bold text-[#252C29] transition-colors truncate">' + loc.name + '</span>';
            listHtml += '      <span class="ws-loc-region text-[9.5px] text-[#69736D] truncate leading-tight">' + loc.region + '</span>';
            listHtml += '    </div>';
            listHtml += '  </div>';
            listHtml += '  <span class="ws-loc-arrow text-[#69736D] text-[11px] font-bold transition-transform flex-shrink-0">↗</span>';
            listHtml += '</li>';
          });
          listEl.innerHTML = listHtml;

          // Attach listeners to items
          var itemEls = listEl.querySelectorAll('.ws-loc-item');
          itemEls.forEach(function (item) {
            item.addEventListener('click', function () {
              var id = item.getAttribute('data-id');
              setActiveLocation(id);
            });
            item.addEventListener('keydown', function (e) {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                var id = item.getAttribute('data-id');
                setActiveLocation(id);
              }
            });
          });
        }
      }

      // Core City Switcher: Uses immutable unique city ID ('mumbai', 'bangalore', 'delhi')
      function selectCity(cityId) {
        if (!NETWORK_DATA[cityId]) return;
        currentCityId = cityId;
        var cityData = NETWORK_DATA[cityId];

        if (cityData.locations && cityData.locations.length > 0) {
          activeLocationId = cityData.locations[0].id;
        } else {
          activeLocationId = null;
        }

        // 1. Update City Pill buttons
        cityPills.forEach(function (pill) {
          if (pill.getAttribute('data-city') === cityId) {
            pill.classList.add('is-active');
            pill.setAttribute('aria-pressed', 'true');
          } else {
            pill.classList.remove('is-active');
            pill.setAttribute('aria-pressed', 'false');
          }
        });

        // 2. Update Map Pin markers (stable, fixed coordinate highlight)
        mapPins.forEach(function (pin) {
          if (pin.getAttribute('data-city') === cityId) {
            pin.classList.add('is-active');
          } else {
            pin.classList.remove('is-active');
          }
        });

        // 3. Update State Highlight in SVG
        statePaths.forEach(function (path) {
          if (path.getAttribute('data-slug') === cityData.stateSlug) {
            path.classList.add('is-active-state');
          } else {
            path.classList.remove('is-active-state');
          }
        });

        // 4. Update Connecting Route Lines
        routeLines.forEach(function (route) {
          var rId = route.id;
          if (cityData.activeRoutes && cityData.activeRoutes.indexOf(rId) !== -1) {
            route.classList.add('is-active');
            route.setAttribute('stroke', '#A6F134');
            route.setAttribute('stroke-width', '2.2');
          } else {
            route.classList.remove('is-active');
            route.setAttribute('stroke', '#7BA684');
            route.setAttribute('stroke-width', '1.5');
          }
        });

        // 5. Update Metadata Text & Badges
        if (clusterBadge) {
          clusterBadge.textContent = cityData.statusBadge;
          clusterBadge.className = 'ws-cluster-badge inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold border ' + cityData.badgeClass;
        }
        if (clusterCount) {
          clusterCount.textContent = cityData.nodesCount;
        }
        if (headerTitleEl) {
          headerTitleEl.textContent = cityData.headerTitle;
        }
        if (footerPromptEl) {
          footerPromptEl.textContent = cityData.footerPrompt;
        }
        if (footerTextEl) {
          footerTextEl.textContent = cityData.footerText;
        }
        if (footerLiveDotEl) {
          footerLiveDotEl.style.display = cityData.footerLiveDot ? 'inline' : 'none';
        }

        // 6. Update Subnodes and Right Panel
        updateSubnodes(cityId);
        renderPanel(cityId);

        // 7. Update Floating Card
        var firstLoc = (cityData.locations && cityData.locations.length > 0) ? cityData.locations[0] : null;
        updateFloatCard(firstLoc, cityId);
      }

      // Pill Click Handlers
      cityPills.forEach(function (pill) {
        pill.addEventListener('click', function () {
          var targetCity = pill.getAttribute('data-city');
          if (targetCity && targetCity !== currentCityId) {
            selectCity(targetCity);
          }
        });
      });

      // Map Pin Direct Click Handlers
      mapPins.forEach(function (pin) {
        pin.addEventListener('click', function () {
          if (isDragSuppressed) return;
          var targetCity = pin.getAttribute('data-city');
          if (targetCity && targetCity !== currentCityId) {
            selectCity(targetCity);
          }
        });
      });

      // State Boundary Click Handlers (e.g. clicking Maharashtra, Karnataka, or Delhi)
      statePaths.forEach(function (path) {
        path.addEventListener('click', function () {
          if (isDragSuppressed) return;
          var slug = path.getAttribute('data-slug');
          if (slug === 'maharashtra' && currentCityId !== 'mumbai') {
            selectCity('mumbai');
          } else if (slug === 'karnataka' && currentCityId !== 'bangalore') {
            selectCity('bangalore');
          } else if (slug === 'delhi' && currentCityId !== 'delhi') {
            selectCity('delhi');
          }
        });
      });

      // Maintain the map stably at its default zoom level (scale 1.0)
      function initDefaultMapLevel() {
        if (!mapStage || !mapSvg) return;
        var zoomLayer = mapSvg.querySelector('#ws-map-zoom-layer');
        if (zoomLayer) {
          zoomLayer.removeAttribute('transform');
        }
      }

      initDefaultMapLevel();

      // ----------------------------------------------------------------------
      // Click outside map popup to dismiss
      // ----------------------------------------------------------------------
      if (mapStage) {
        mapStage.addEventListener('click', function (e) {
          // If clicked inside popup, subnode marker, city pill, or list: do not dismiss
          if (
            e.target.closest('.ws-map-float-card') ||
            e.target.closest('.ws-subnode-marker') ||
            e.target.closest('.ws-city-pill') ||
            e.target.closest('.ws-loc-item') ||
            e.target.closest('.ws-map-pin')
          ) {
            return;
          }

          if (floatCard && !isDragSuppressed) {
            floatCard.classList.add('is-dismissed');
            floatCard.style.display = 'none';
          }
        });
      }

      // Initial Selection: Mumbai & Thane
      selectCity('mumbai');
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initNetworkMap);
  } else {
    initNetworkMap();
  }
})();
