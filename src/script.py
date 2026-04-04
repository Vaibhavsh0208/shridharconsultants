import os

OUTPUT_FILE = "project_dump.txt"
SEPARATOR = "\n" + "=" * 80 + "\n"

def build_tree(root_dir):
    tree_lines = []

    for root, dirs, files in os.walk(root_dir):
        level = root.replace(root_dir, "").count(os.sep)
        indent = "│   " * level
        tree_lines.append(f"{indent}├── {os.path.basename(root)}/")

        sub_indent = "│   " * (level + 1)
        for file in files:
            tree_lines.append(f"{sub_indent}├── {file}")

    return "\n".join(tree_lines)


def dump_files(root_dir):
    content = []

    for root, dirs, files in os.walk(root_dir):
        for file in files:
            file_path = os.path.join(root, file)

            # Skip the output file itself
            if file == OUTPUT_FILE:
                continue

            content.append(SEPARATOR)
            content.append(f"FILE: {file_path}")
            content.append(SEPARATOR)

            try:
                with open(file_path, "r", encoding="utf-8") as f:
                    content.append(f.read())
            except Exception as e:
                content.append(f"[Could not read file: {e}]")

    return "\n".join(content)


def main():
    root_dir = os.path.dirname(os.path.abspath(__file__))

    tree = build_tree(root_dir)
    files_content = dump_files(root_dir)

    with open(os.path.join(root_dir, OUTPUT_FILE), "w", encoding="utf-8") as out:
        out.write("DIRECTORY TREE:\n")
        out.write(tree)
        out.write("\n\n")
        out.write("#" * 80)
        out.write("\nALL FILE CONTENTS:\n")
        out.write(files_content)

    print(f"Done! Output saved to {OUTPUT_FILE}")


if __name__ == "__main__":
    main()