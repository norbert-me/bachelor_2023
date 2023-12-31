<?php
// Creating a new setting page.
//how to get/load the setttings?

/**
 * @package qtype_drawing
 * @author Amr Hourani amr.hourani@id.ethz.ch
 * @copyright ETHz 2016 amr.hourani@id.ethz.ch
 */
defined('MOODLE_INTERNAL') || die();

if ($ADMIN->fulltree) {
        require_once($CFG->dirroot . '/question/type/drawing/lib.php');

        // Introductory explanation that all the settings are defaults for the edit_drawing_form.
        $settings->add(
                new admin_setting_heading('configintro', '', get_string('configintro', 'qtype_drawing'))
        );
        // Teachers can chose which drawing mode?.
        $settings->add(
                new admin_setting_configcheckbox(
                        'qtype_drawing/allowteachertochosemode',
                        get_string('allowteachertochosemode', 'qtype_drawing'),
                        get_string('allowteachertochosemode_help', 'qtype_drawing'),
                        0
                )
        );
        // Teachers can allow Eraser?.
        $settings->add(
                new admin_setting_configcheckbox(
                        'qtype_drawing/enableeraser',
                        get_string('enableeraser', 'qtype_drawing'),
                        get_string('enableeraser_help', 'qtype_drawing'),
                        0
                )
        );
        // Default canvas width.
        $settings->add(
                $x = new admin_setting_configtext(
                        'qtype_drawing/defaultcanvaswidth',
                        get_string('defaultcanvaswidth', 'qtype_drawing'),
                        get_string('defaultcanvaswidth_help', 'qtype_drawing'),
                        580,
                        PARAM_INT,
                        4
                )
        );
        // Default canvas height.
        $settings->add(
                new admin_setting_configtext(
                        'qtype_drawing/defaultcanvasheight',
                        get_string('defaultcanvasheight', 'qtype_drawing'),
                        get_string('defaultcanvasheight_help', 'qtype_drawing'),
                        400,
                        PARAM_INT,
                        4
                )
        );
}
