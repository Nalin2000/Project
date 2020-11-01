/*
Author : Witoon Pomipon
Email : codebee2014@gmail.com
Website : codebee.co.th
Company : codebee company limited
*/

;(function ($) {
  $.fn.AutoProvince = function (options) {
    const Setting = $.extend(
      {
        PROVINCE: '#province', // select div สำหรับรายชื่อจังหวัด
        AMPHUR: '#amphur', // select div สำหรับรายชื่ออำเภอ
        DISTRICT: '#district', // select div สำหรับรายชื่อตำบล
        POSTCODE: '#postcode', // input field สำหรับรายชื่อรหัสไปรษณีย์
        arrangeByName: false, // กำหนดให้เรียงตามตัวอักษร
      },
      options
    )

    return this.each(function () {
      let xml
      const dataUrl = 'thailand.xml'

      $(function () {
        initialize()
      })

      function initialize() {
        $.ajax({
          type: 'GET',
          url: dataUrl,
          dataType: 'xml',
          success(xmlDoc) {
            xml = $(xmlDoc)

            _loadProvince()
            addEventList()
          },
          error() {
            console.log('Failed to get xml')
          },
        })
      }

      function _loadProvince() {
        const list = []
        xml.find('table').each(function (index) {
          if ($(this).attr('name') == Setting.PROVINCE.split('#')[1]) {
            const PROVINCE_ID = $(this).children().eq(0).text()
            const PROVINCE_NAME = $(this).children().eq(2).text()
            if (PROVINCE_ID) list.push({ id: PROVINCE_ID, name: PROVINCE_NAME })
          }
        })
        if (Setting.arrangeByName) {
          AddToView(list.sort(SortByName), Setting.PROVINCE)
        } else {
          AddToView(list, Setting.PROVINCE)
        }
      }

      function _loadAmphur(PROVINCE_ID_SELECTED) {
        const list = []
        let isFirst = true
        $(Setting.AMPHUR).empty()
        xml.find('table').each(function (index) {
          if ($(this).attr('name') == Setting.AMPHUR.split('#')[1]) {
            const AMPHUR_ID = $(this).children().eq(0).text()
            const AMPHUR_NAME = $(this).children().eq(2).text()
            const POSTCODE = $(this).children().eq(3).text()
            const PROVINCE_ID = $(this).children().eq(5).text()
            if (PROVINCE_ID_SELECTED == PROVINCE_ID && AMPHUR_ID) {
              if (isFirst) _loadDistrict(AMPHUR_ID)
              isFirst = false
              list.push({
                id: AMPHUR_ID,
                name: AMPHUR_NAME,
                postcode: POSTCODE,
              })
              $(Setting.POSTCODE).val(POSTCODE)
            }
          }
        })
        if (Setting.arrangeByName) {
          AddToView(list.sort(SortByName), Setting.AMPHUR)
        } else {
          AddToView(list, Setting.AMPHUR)
        }
      }

      function _loadDistrict(AMPHUR_ID_SELECTED) {
        const list = []
        $(Setting.DISTRICT).empty()
        xml.find('table').each(function (index) {
          if ($(this).attr('name') == Setting.DISTRICT.split('#')[1]) {
            const DISTRICT_ID = $(this).children().eq(0).text()
            const DISTRICT_NAME = $(this).children().eq(2).text()
            const AMPHUR_ID = $(this).children().eq(3).text()
            if (AMPHUR_ID_SELECTED == AMPHUR_ID && DISTRICT_ID) {
              list.push({ id: DISTRICT_ID, name: DISTRICT_NAME })
            }
          }
        })
        if (Setting.arrangeByName) {
          AddToView(list.sort(SortByName), Setting.DISTRICT)
        } else {
          AddToView(list, Setting.DISTRICT)
        }
      }

      function addEventList() {
        $(Setting.PROVINCE).change(function (e) {
          const PROVINCE_ID = $(this).val()
          _loadAmphur(PROVINCE_ID)
        })
        $(Setting.AMPHUR).change(function (e) {
          const AMPHUR_ID = $(this).val()
          $(Setting.POSTCODE).val(
            $(this).find('option:selected').attr('POSTCODE')
          )
          _loadDistrict(AMPHUR_ID)
        })
      }
      function AddToView(list, key) {
        for (let i = 0; i < list.length; i++) {
          if (key != Setting.AMPHUR) {
            $(key).append(
              "<option value='" + list[i].id + "'>" + list[i].name + '</option>'
            )
          } else {
            $(key).append(
              "<option value='" +
                list[i].id +
                "' POSTCODE='" +
                list[i].postcode +
                "'>" +
                list[i].name +
                '</option>'
            )
          }
        }
      }

      function SortByName(a, b) {
        const aName = a.name.toLowerCase()
        const bName = b.name.toLowerCase()
        return aName < bName ? -1 : aName > bName ? 1 : 0
      }
    })
  }
})(jQuery)
